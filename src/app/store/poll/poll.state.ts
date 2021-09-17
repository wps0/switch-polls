import { IPoll } from '@shared/models/IPoll';
import { IResultsSummary } from '@shared/models/IResultsSummary';

export interface PollState {
  selectedPoll: IPoll;
  backendResponse: string;
  results: IResultsSummary;
}
