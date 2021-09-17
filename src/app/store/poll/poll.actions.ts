import { createAction, props } from '@ngrx/store';
import { IPoll } from '@shared/models/IPoll';
import { UserData } from '@shared/models/UserData';

export const UPDATE_SELECTED_POLL = '[Poll] Update selected';

export const GET_POLL = '[Poll] Get poll';
export const GET_RESULTS = '[Poll] Get results';

export const ADD_VOTE = '[Poll] Add vote';
export const VOTE_RECORDED = '[Poll] Vote recorded';

export const UpdateSelectedPoll = createAction(
  UPDATE_SELECTED_POLL,
  props<{ newPoll: IPoll }>()
);

// used for effects
export const GetPoll = createAction(
  GET_POLL,
  props<{ pollId: number; userData: UserData }>()
);
export const GetResults = createAction(GET_RESULTS, props<{ pollId: number }>());

export const AddVote = createAction(
  ADD_VOTE,
  props<{ optId: number; userData: UserData }>()
);
export const VoteRecorded = createAction(VOTE_RECORDED);
