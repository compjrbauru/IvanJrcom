import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { EditEventsComponent } from './edit-events.component';



const EDITEVENTS_COMPONENTS = [EditEventsComponent];

@NgModule({
  imports: [ThemeModule],
  declarations: [...EDITEVENTS_COMPONENTS],
})
export class EditEventsModule {}
