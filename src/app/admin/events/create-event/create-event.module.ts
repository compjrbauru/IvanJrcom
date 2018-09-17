import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ConfirmationModalModule } from '../../../@core/components/confirmation-modal/confirmation-modal.module';
import { FormEventoModule } from '../../../@core/components/form-evento/form-evento.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { MapModule } from './../../../@core/components/map/map.module';
import { CreateCategoriaModule } from './create-categoria/create-caregoria.module';
import { CreateEventComponent } from './create-event.component';

// tslint:disable-next-line:max-line-length
const CREATEEVENT_COMPONENTS = [CreateEventComponent];

@NgModule({
  entryComponents: [ConfirmationModalComponent],
  imports: [
    ThemeModule,
    CreateCategoriaModule,
    FormEventoModule,
    ConfirmationModalModule,
    MatDialogModule,
    MapModule,
  ],
  declarations: [...CREATEEVENT_COMPONENTS],
})
export class CreateEventModule {}
