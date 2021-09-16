import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GetPoll, UPDATE_SELECTED_POLL} from './poll.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BackendService} from '../../shared/services/backend.service';
import {EMPTY} from 'rxjs';

@Injectable()
export class PollEffects {
  loadPoll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPoll),
      switchMap((action) =>
        this.backendService.getPoll(action.pollId).pipe(
          map((poll) => ({ type: UPDATE_SELECTED_POLL, newPoll: poll })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private backendService: BackendService) {}
}
