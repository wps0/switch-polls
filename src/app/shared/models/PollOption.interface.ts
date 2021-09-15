import {OptionExtras} from "./OptionExtras.interface";

export interface PollOption {
  id: number;
  content: string;
  extras?: OptionExtras[];
}
