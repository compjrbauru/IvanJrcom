import { NgModule } from '@angular/core';

import { ListEventsComponent } from './list-events.component';
import { TableModule } from '../../../table/table.module';

@NgModule({
  imports: [
    TableModule,
  ],
  declarations: [
    ListEventsComponent,
  ],
  exports: [
    ListEventsComponent,
  ],
})
export class ListEventsModule { }
