import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme-admin/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DataModule } from './data/data.module';
import { TableModule } from './table/table.module';

const ADMIN_COMPONENTS = [AdminComponent];

@NgModule({
  imports: [AdminRoutingModule, ThemeModule, DataModule, TableModule],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {}
