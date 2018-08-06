import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventsComponent } from './edit-events/edit-events.component';

const routes: Routes = [{
  path: '',
  component: EventsComponent,
   children: [{
    path: 'create',
    component: CreateEventComponent,
  }, {
    path: 'edit',
    component: EditEventsComponent,
  }], 
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class EventsRoutingModule {}
