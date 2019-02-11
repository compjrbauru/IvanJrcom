import { Pipe, PipeTransform } from '@angular/core';
import  memo  from 'memo-decorator';

@Pipe({
  name: 'eventLocation',
  pure: true,
})

export class EventLocationPipe implements PipeTransform {

    @memo()
    transform(value: any): any {
        return value.split(',')[1];
    }
}
