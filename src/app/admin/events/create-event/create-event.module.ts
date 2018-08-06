import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { CreateEventComponent } from './create-event.component';



const CREATEEVENT_COMPONENTS = [CreateEventComponent];

@NgModule({
  imports: [ThemeModule],
  declarations: [...CREATEEVENT_COMPONENTS],
})
export class CreateEventModule {}
