import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { QueryService } from '../../services/query.service';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  providers: [
    QueryService,
  ],
  exports: [
    TableComponent,
  ],
})
export class TableModule { }
