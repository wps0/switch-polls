import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PollState } from './poll.state';

const pollFeature = createFeatureSelector<PollState>('poll');

export const selectPoll = createSelector(pollFeature, (state) => state.selectedPoll);
export const selectResponse = createSelector(
  pollFeature,
  (state) => state.backendResponse
);
export const selectResults = createSelector(pollFeature, (state) => state.results);
