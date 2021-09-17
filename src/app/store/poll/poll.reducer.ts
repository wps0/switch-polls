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
  backendResponse: '',
  results: {
    summary: [],
  },
};

export const pollReducer = createReducer(
  initialState,
  on(Actions.GetPoll, (state) => state),
  on(Actions.GetResults, (state) => state),

  on(Actions.UpdateSelectedPoll, (state, action) => ({
    selectedPoll: action.newPoll,
    backendResponse: '',
    results: state.results,
  })),
  on(Actions.UpdateResults, (state, action) => ({
    selectedPoll: state.selectedPoll,
    backendResponse: '',
    results: action.results,
  })),

  on(Actions.VoteRecorded, (state) => ({
    selectedPoll: state.selectedPoll,
    backendResponse:
      'OK! Aby potwierdzić swój głos, kliknij w link potwierdzający znajdujący się na poczcie szkolnej (poczta.zsi.kielce.pl)',
    results: state.results,
  })),
  on(Actions.VoteError, (state, action) => ({
    selectedPoll: state.selectedPoll,
    backendResponse: action.err.error ?? 'Nieznany błąd',
    results: state.results,
  }))
);
