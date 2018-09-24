import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/can-deactivate-guard.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventsComponent } from './edit-events/list-events/list-events.component';
import { EventsComponent } from './events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      {
        path: 'create',
        component: CreateEventComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit',
        component: ListEventsComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
