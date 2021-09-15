import {PollOption} from "./PollOption.interface";

export interface PollInterface {
  title: string;
  description?: string;
  options: PollOption[];
}
