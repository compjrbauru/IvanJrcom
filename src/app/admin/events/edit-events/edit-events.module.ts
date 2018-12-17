

import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { EditEventsComponent } from './edit-events.component';
import { ConfirmationModalComponent } from '../../../@core/components/confirmation-modal/confirmation-modal.component';
import { TableModule } from '../../table/table.module';
import { FormEventoModule } from '../../../@core/components/form-evento/form-evento.module';
import { UploadFileModule } from '../../../@core/components/upload-file/upload-file.module';
import { MapModule } from '../../../@core/components/map/map.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';


const EDITEVENTS_COMPONENTS = [];

@NgModule({
  entryComponents: [
    ConfirmationModalComponent,
  ],
  imports: [
    ThemeModule,
    TableModule,
    FormEventoModule,
    UploadFileModule,
    MapModule,
    MatDialogModule,
  ],
  declarations: [EditEventsComponent],
})
export class EditEventsModule {}
