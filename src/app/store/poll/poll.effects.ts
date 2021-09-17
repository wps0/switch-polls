// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AddVote,
  GetPoll,
  GetResults,
  UPDATE_RESULTS,
  UPDATE_SELECTED_POLL,
  VOTE_ERROR,
  VOTE_RECORDED,
} from './poll.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BackendService } from '@shared/services/backend.service';
import { EMPTY, of } from 'rxjs';
import { NotificationsService } from '@shared/services/notifications.service';

@Injectable()
export class PollEffects {
  loadPoll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetPoll),
      switchMap((action) =>
        this.backendService
          .getPoll(action.pollId, action.userData.recaptchaToken)
          .pipe(
            map((poll) => ({ type: UPDATE_SELECTED_POLL, newPoll: poll })),
            catchError(() => {
              this.notificationsService.sendNotification(
                'Ta ankieta nie może zostać załadowana!'
              );
              return EMPTY;
            })
          )
      )
    );
  });
  getResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetResults),
      switchMap((action) =>
        this.backendService.getResultsSummary(action.pollId, action.userData).pipe(
          map((res) => ({ type: UPDATE_RESULTS, results: res })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  addVote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddVote),
      switchMap((action) =>
        this.backendService.addVote(action.optId, action.userData).pipe(
          map(() => ({ type: VOTE_RECORDED })),
          catchError((error) => {
            return of({
              type: VOTE_ERROR,
              err: error,
            });
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private backendService: BackendService,
    private notificationsService: NotificationsService
  ) {}
}
