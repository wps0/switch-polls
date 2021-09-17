import { createReducer, on } from '@ngrx/store';
import * as Actions from './poll.actions';
import { PollState } from '@store/poll/poll.state';

const initialState: PollState = {
  selectedPoll: {
    id: 0,
    title: 'Loading...',
    description: 'Loading...',
    options: [],
  },
};

export const pollReducer = createReducer(
  initialState,
  on(Actions.UpdateSelectedPoll, (state, action) => ({
    selectedPoll: action.newPoll,
  })),
  on(Actions.GetPoll, (state) => {
    return state;
  }),
  on(Actions.VoteRecorded, (state) => {
    return state;
  })
);
