import { Component, OnInit } from '@angular/core';
import { format, RouteUtils } from '@shared/RouteUtils';
import { Store } from '@ngrx/store';
import { PollState } from '@store/poll/poll.state';
import { GET_RESULTS } from '@store/poll/poll.actions';
import { UserData } from '@shared/models/UserData';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
})
export class ResultsViewComponent implements OnInit {
  selectedId: number = 0;
  recaptcha$: Subscription | undefined;

  constructor(
    private pollStore: Store<PollState>,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.recaptcha$ = this.reCaptchaV3Service
      .execute('poll_results_get')
      .subscribe((token) => {
        const userData: UserData = {
          username: '',
          userAgent: window.navigator.userAgent,
          recaptchaToken: token,
        };
        this.pollStore.dispatch({
          type: GET_RESULTS,
          pollId: this.selectedId,
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
      format(RouteUtils.POLL, {
        id: this.selectedId,
      })
    );
  }
}
