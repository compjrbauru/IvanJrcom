import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ConfirmationModalModule } from '../../../@core/components/confirmation-modal/confirmation-modal.module';
import { FormEventoModule } from '../../../@core/components/form-evento/form-evento.module';
import { UploadFileModule } from '../../../@core/components/upload-file/upload-file.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';
// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { MapModule } from './../../../@core/components/map/map.module';
import { CreateEventComponent } from './create-event.component';

const CREATEEVENT_COMPONENTS = [CreateEventComponent];

@NgModule({
  entryComponents: [ConfirmationModalComponent],
  imports: [
    ThemeModule,
    FormEventoModule,
    ConfirmationModalModule,
    MatDialogModule,
    MapModule,
    UploadFileModule,
  ],
  declarations: [...CREATEEVENT_COMPONENTS],
})
export class CreateEventModule { }
