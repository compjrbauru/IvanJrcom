import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme-admin/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DataModule } from './data/data.module';
import { TableModule } from './table/table.module';
import { CreateDepositoComponent } from './deposito/create-deposito/create-deposito.component';
import { EditDepositoComponent } from './deposito/edit-deposito/edit-deposito.component';
import { DepositosAtivosComponent } from './deposito/depositos-ativos/depositos-ativos.component';

const ADMIN_COMPONENTS = [AdminComponent];

@NgModule({
  imports: [AdminRoutingModule, ThemeModule, DataModule, TableModule],
  declarations: [...ADMIN_COMPONENTS, CreateDepositoComponent, EditDepositoComponent, DepositosAtivosComponent],
})
export class AdminModule { }
