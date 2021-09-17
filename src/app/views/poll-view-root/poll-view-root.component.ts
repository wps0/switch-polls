import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { IPoll } from '@shared/models/IPoll';
import { selectPoll } from '@store/poll/poll.selectors';
import { Store } from '@ngrx/store';
import { PollState } from '@store/poll/poll.state';
import { UserData } from '@shared/models/UserData';
import { GET_POLL } from '@store/poll/poll.actions';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-poll-view-root',
  templateUrl: './poll-view-root.component.html',
  styleUrls: ['./poll-view-root.component.scss'],
})
export class PollViewRootComponent implements OnInit {
  @Output()
  selectedIdChange: EventEmitter<number> = new EventEmitter<number>();
  selectedPoll$: Observable<IPoll> = of();
  recaptcha$!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pollStore: Store<PollState>,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.selectedPoll$ = this.pollStore.select(selectPoll);

    let selectedId = 0;
    this.activatedRoute.paramMap.subscribe((params) => {
      let newId = parseInt(params.get('id') ?? '-1');
      if (newId >= 0 && newId !== selectedId) {
        selectedId = newId;
        this.selectedIdChange.emit(newId);
        this.recaptcha$ = this.reCaptchaV3Service
          .execute('poll_get')
          .subscribe((token) => {
            const userData: UserData = {
              username: '',
              userAgent: window.navigator.userAgent,
              recaptchaToken: token,
            };
            this.pollStore.dispatch({
              type: GET_POLL,
              pollId: newId,
              userData: userData,
            });
          });
      }
    });
  }
}
