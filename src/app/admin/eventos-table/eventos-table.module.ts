import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { QueryService } from './../../services/query.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  providers: [
    QueryService,
  ],
})
export class TablesModule { }
