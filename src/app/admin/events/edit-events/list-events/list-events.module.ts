import { NgModule } from '@angular/core';

import { FormEventoModule } from '../../../../@core/components/form-evento/form-evento.module';
import { ThemeModule } from '../../../../@theme-admin/theme.module';
import { TableModule } from '../../../table/table.module';
import { MapModule } from './../../../../@core/components/map/map.module';
import { UploadFileModule } from './../../../../@core/components/upload-file/upload-file.module';
import { ListEventsComponent } from './list-events.component';

@NgModule({
  imports: [
    ThemeModule,
    TableModule,
    FormEventoModule,
    UploadFileModule,
    MapModule,
  ],
  declarations: [ListEventsComponent],
  exports: [ListEventsComponent],
})
export class ListEventsModule {}
