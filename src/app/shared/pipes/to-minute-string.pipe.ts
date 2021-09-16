import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMinuteString',
})
export class ToMinuteStringPipe implements PipeTransform {
  transform(value: number): string {
    if (Number.isNaN(value)) {
      return '--:--';
    }

    const out: string[] = [];
    if (value / 60 < 10) {
      out.push('0');
    }
    out.push(Math.floor(value / 60).toString());
    out.push(':');
    if (Math.round(value) % 60 < 10) {
      out.push('0');
    }
    out.push((Math.round(value) % 60).toString());
    return out.join('');
  }
}
