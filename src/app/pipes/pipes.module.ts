import { EventLocationPipe } from './eventLocation.pipe';
import { DocToKeyPipe } from './docToKey.pipe';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SecondsToDatePiPe } from './secondsToDate.pipe';

@NgModule({
  imports: [],
  declarations: [
    DocToKeyPipe,
    SecondsToDatePiPe,
    EventLocationPipe,
  ],
  exports: [
    EventLocationPipe,
    DocToKeyPipe,
    SecondsToDatePiPe,
  ],
  providers: [
    DatePipe,
  ],
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
