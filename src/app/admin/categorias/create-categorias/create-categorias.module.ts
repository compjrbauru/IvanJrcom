import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ConfirmationModalModule } from '../../../@core/components/confirmation-modal/confirmation-modal.module';
import { FormCategoriaModule } from '../../../@core/components/form-categoria/form-categoria.module';
import { UploadFileModule } from '../../../@core/components/upload-file/upload-file.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { CreateCategoriasComponent } from './create-categorias.component';

// tslint:disable-next-line:max-line-length

const CREATECATEGORIAS_COMPONENTS = [CreateCategoriasComponent];

@NgModule({
    entryComponents: [ConfirmationModalComponent],
    imports: [
        ThemeModule,
        ConfirmationModalModule,
        MatDialogModule,
        UploadFileModule,
        FormCategoriaModule,
    ],
    declarations: [...CREATECATEGORIAS_COMPONENTS],
})
export class CreateCategoriasModule { }
