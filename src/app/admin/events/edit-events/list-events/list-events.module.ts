import { NgModule } from '@angular/core';

import { ListEventsComponent } from './list-events.component';
import { TableModule } from '../../../table/table.module';
import { FormEventoModule } from '../../../../@core/components/form-evento/form-evento.module';
import { ThemeModule } from '../../../../@theme-admin/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    TableModule,
    FormEventoModule,
  ],
  declarations: [
    ListEventsComponent,
  ],
  exports: [
    ListEventsComponent,
  ],
})
export class ListEventsModule { }
