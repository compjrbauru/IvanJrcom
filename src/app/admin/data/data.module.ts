import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-admin/theme.module';
import { DataComponent } from './data.component';
import { DataRoutingModule } from './data-routing.module';
import { ListEventsModule } from './list-events/list-events.module';

const DATA_COMPONENTS = [DataComponent];

@NgModule({
  imports: [DataRoutingModule, ThemeModule, ListEventsModule],
  declarations: [...DATA_COMPONENTS],
})
export class DataModule {}
