import {createAction, props} from '@ngrx/store';
import {IPoll} from '@shared/models/IPoll';

export const UPDATE_SELECTED_POLL = '[Poll] Update selected';

export const GET_POLL = '[Poll] Get poll';
export const GET_RESULTS = '[Poll] Get results';

export const ADD_VOTE = '[Poll] Add vote';

export const UpdateSelectedPoll = createAction(
  UPDATE_SELECTED_POLL,
  props<{ newPoll: IPoll }>()
);

// used for effects
export const GetPoll = createAction(GET_POLL, props<{ pollId: number }>());
export const GetResults = createAction(GET_RESULTS, props<{ pollId: number }>());

export const AddVote = createAction(ADD_VOTE, props<{ optId: number }>());
