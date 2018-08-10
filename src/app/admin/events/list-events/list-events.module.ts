import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserModule } from '@angular/platform-browser';
import { ListEventsComponent } from './list-events.component';

@NgModule({
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ListEventsComponent,
  ],
})
export class ListEventsModule { }
