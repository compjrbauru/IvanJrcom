import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { EditEventsComponent } from './edit-events.component';
import { ListEventsModule } from './list-events/list-events.module';



const EDITEVENTS_COMPONENTS = [EditEventsComponent];

@NgModule({
  imports: [ThemeModule, ListEventsModule],
  declarations: [...EDITEVENTS_COMPONENTS],
})
export class EditEventsModule {}
