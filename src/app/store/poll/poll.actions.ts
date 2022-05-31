import { createAction, props } from '@ngrx/store';
import { IPoll } from '@shared/models/IPoll';
import { UserData } from '@shared/models/UserData';
import { HttpErrorResponse } from '@angular/common/http';
import { IResultsSummary } from '@shared/models/IResultsSummary';

export const UPDATE_SELECTED_POLL = '[Poll] Update selected';
export const UPDATE_RESULTS = '[Poll] Update results';

export const GET_POLL = '[Poll] Get poll';
export const GET_RESULTS = '[Poll] Get results';

export const ADD_VOTE = '[Poll] Add vote';
export const VOTE_RECORDED = '[Poll] Vote recorded';
export const VOTE_ERROR = '[Poll] Vote error';

export const RESET_BACKEND_RESPONSE = '[Poll] Reset backend response';

export const UpdateSelectedPoll = createAction(
  UPDATE_SELECTED_POLL,
  props<{ newPoll: IPoll }>()
);
export const UpdateResults = createAction(
  UPDATE_RESULTS,
  props<{ results: IResultsSummary }>()
);

// used for effects
export const GetPoll = createAction(
  GET_POLL,
  props<{ pollId: number; userData: UserData }>()
);
export const GetResults = createAction(
  GET_RESULTS,
  props<{ pollId: number; userData: UserData }>()
);

export const AddVote = createAction(
  ADD_VOTE,
  props<{ optId: number; userData: UserData }>()
);
export const VoteRecorded = createAction(VOTE_RECORDED);
export const VoteError = createAction(
  VOTE_ERROR,
  props<{ err: HttpErrorResponse }>()
);

export const ResetBackendResponse = createAction(RESET_BACKEND_RESPONSE);
