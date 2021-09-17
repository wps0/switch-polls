import { IRequestUserData } from '@shared/models/IRequestUserData';

export interface UserData extends IRequestUserData {
  recaptchaToken: string;
}
