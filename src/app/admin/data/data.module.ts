import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-admin/theme.module';
import { DataComponent } from './data.component';
import { DataRoutingModule } from './data-routing.module';

const DATA_COMPONENTS = [DataComponent];

@NgModule({
  imports: [DataRoutingModule, ThemeModule],
  declarations: [...DATA_COMPONENTS],
})
export class DataModule {}
