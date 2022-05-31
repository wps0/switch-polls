import {IPollOption} from './PollOption.interface';

export interface IPoll {
  id: number;
  title: string;
  description?: string;
  options: IPollOption[];
  is_readonly: boolean
}
