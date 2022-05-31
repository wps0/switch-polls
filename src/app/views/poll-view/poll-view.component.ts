import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPoll } from '@shared/models/IPoll';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { PollState } from '@store/poll/poll.state';
import { Store } from '@ngrx/store';
import { selectPoll, selectResponse } from '@store/poll/poll.selectors';
import { ADD_VOTE, RESET_BACKEND_RESPONSE } from "@store/poll/poll.actions";
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NotificationsService } from '@shared/services/notifications.service';
import { UserData } from '@shared/models/UserData';
import { format, RouteUtils } from '@shared/RouteUtils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss'],
})
export class PollViewComponent implements OnInit, OnDestroy {
  selectedId: number = -1;
  pollForm = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      },
    ],
    option: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });
  submissionInProgress: boolean = false;
  selectedPoll$: Observable<IPoll> = of();
  response$: Observable<string> = of();
  responseSubscription$!: Subscription;
  pollSubscription$!: Subscription;
  recaptcha$: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pollStore: Store<PollState>,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private notificationsService: NotificationsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.pollForm.disable();
    this.response$ = this.pollStore.select(selectResponse);
    this.selectedPoll$ = this.pollStore.select(selectPoll);
    this.pollSubscription$ = this.selectedPoll$.subscribe((poll) => {
      if (poll.title) {
        this.titleService.setTitle(`${poll.title} | Ankiety SWITCH`);
        if (poll.is_readonly) {
          this.pollForm.disable();
        } else {
          this.pollForm.enable();
        }
      }
    });
    this.responseSubscription$ = this.response$.subscribe((text) => {
      this.submissionInProgress = false;
      if (text.length != 0) {
        this.notificationsService.sendNotification(text, 5000);
        this.pollStore.dispatch({type: RESET_BACKEND_RESPONSE});
      }
    });
  }

  ngOnDestroy() {
    if (this.recaptcha$) {
      this.recaptcha$.unsubscribe();
    }
    this.pollSubscription$.unsubscribe();
    this.responseSubscription$.unsubscribe();
  }

  onSubmit() {
    this.submissionInProgress = true;
    if (this.recaptcha$) {
      this.recaptcha$.unsubscribe();
    }
    this.recaptcha$ = this.reCaptchaV3Service
      .execute('poll_vote')
      .subscribe((token) => {
        const userData: UserData = {
          username: this.username?.value,
          userAgent: window.navigator.userAgent,
          recaptchaToken: token,
        };
        this.pollStore.dispatch({
          type: ADD_VOTE,
          optId: this.selectedOpt?.value,
          userData: userData,
        });
      });
  }

  onSelectedIdChange(newId: number) {
    this.selectedId = newId;
  }

  get resultsUrl() {
    return (
      '/' +
      format(RouteUtils.POLL_RESULTS, {
        id: this.selectedId,
      })
    );
  }

  get username() {
    return this.pollForm.get('email');
  }

  get selectedOpt() {
    return this.pollForm.get('option');
  }
}
