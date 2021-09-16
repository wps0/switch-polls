import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPoll } from '@shared/models/IPoll';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { PollState } from '@store/poll/poll.state';
import { Store } from '@ngrx/store';
import { selectPoll } from '@store/poll/poll.selectors';
import { ADD_VOTE, GET_POLL } from '@store/poll/poll.actions';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NotificationsService } from '@shared/services/notifications.service';
import { UserData } from '@shared/models/UserData';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss'],
})
export class PollViewComponent implements OnInit, OnDestroy {
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
  selectedId: number = -1;
  submissionDisabled: boolean = false;
  selectedPoll$: Observable<IPoll> = of();
  recaptcha$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pollStore: Store<PollState>,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.selectedPoll$ = this.pollStore.select(selectPoll);
    this.activatedRoute.paramMap.subscribe((params) => {
      let newId = parseInt(params.get('id') ?? '-1');
      if (newId !== this.selectedId) {
        this.selectedId = newId;
        this.pollStore.dispatch({
          type: GET_POLL,
          pollId: this.selectedId,
        });
      }
    });
  }

  ngOnDestroy() {
    this.recaptcha$.unsubscribe();
  }

  onSubmit() {
    this.submissionDisabled = true;
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
          optId: this.selectedOpt,
          userData: userData,
        });
      });
  }

  get username() {
    return this.pollForm.get('email');
  }

  get selectedOpt() {
    return this.pollForm.get('option');
  }
}
