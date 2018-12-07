import { Pipe, PipeTransform } from '@angular/core';
import  memo  from 'memo-decorator';

@Pipe({
  name: 'secondsToDate',
  pure: true,
})

export class SecondsToDatePiPe implements PipeTransform {
  @memo()
  transform(value: any): any {
    return value ? value.seconds * 1000 : null;
  }
}
