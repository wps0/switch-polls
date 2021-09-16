import {OptionExtras} from './OptionExtras.interface';

export interface IPollOption {
  id: number;
  content: string;
  extras?: OptionExtras[];
}
