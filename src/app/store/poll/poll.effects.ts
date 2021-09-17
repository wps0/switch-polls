import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AddVote,
  GetPoll,
  UPDATE_SELECTED_POLL,
  VOTE_RECORDED,
} from './poll.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BackendService } from '@shared/services/backend.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class PollEffects {
  loadPoll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPoll),
      switchMap((action) =>
        this.backendService
          .getPoll(action.pollId, action.userData.recaptchaToken)
          .pipe(
            map((poll) => ({ type: UPDATE_SELECTED_POLL, newPoll: poll })),
            catchError(() => EMPTY)
          )
      )
    )
  );
  addVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddVote),
      switchMap((action) =>
        this.backendService.addVote(action.optId, action.userData).pipe(
          map(() => ({ type: VOTE_RECORDED })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private backendService: BackendService) {}
}
