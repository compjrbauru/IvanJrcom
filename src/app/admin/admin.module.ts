import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme-admin/theme.module';
import { DataModule} from './data/data.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EditEventsComponent } from './events/edit-events/edit-events.component';

const ADMIN_COMPONENTS = [AdminComponent];

@NgModule({
  imports: [AdminRoutingModule, ThemeModule, DataModule],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {}
