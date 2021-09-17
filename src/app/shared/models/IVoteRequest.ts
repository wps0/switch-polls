import { IRequestUserData } from '@shared/models/IRequestUserData';

export interface IVoteRequest {
  optionId: number;
  userData: IRequestUserData;
}
