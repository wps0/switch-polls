import { Pipe, PipeTransform } from '@angular/core';
import { IPollOption } from '@shared/models/PollOption.interface';

@Pipe({
  name: 'extractExtraFromPollOption',
})
export class ExtractExtraFromPollOptionPipe implements PipeTransform {
  transform(value: IPollOption, type: string): string | undefined {
    return value.extras?.find((extra) => extra.type === type)?.value;
  }
}
