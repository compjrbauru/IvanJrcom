import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme-admin/theme.module';
import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { EchartsPieEventComponent } from './echarts-pie-event/echarts-pie-event.component';

const DATA_COMPONENTS = [DataComponent, EchartsPieEventComponent];

@NgModule({
  imports: [DataRoutingModule, ThemeModule, NgxEchartsModule],
  declarations: [...DATA_COMPONENTS],
})
export class DataModule {}
