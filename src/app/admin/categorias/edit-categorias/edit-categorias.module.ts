import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ConfirmationModalModule } from '../../../@core/components/confirmation-modal/confirmation-modal.module';
import { UploadFileModule } from '../../../@core/components/upload-file/upload-file.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';
// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { FormCategoriaModule } from './../../../@core/components/form-categoria/form-categoria.module';
import { TableModule } from './../../table/table.module';
import { EditCategoriasComponent } from './edit-categorias.component';



const EDITCATEGORIAS_COMPONENTS = [EditCategoriasComponent];

@NgModule({
    entryComponents: [ConfirmationModalComponent],
    imports: [
        ThemeModule,
        ConfirmationModalModule,
        FormCategoriaModule,
        MatDialogModule,
        UploadFileModule,
        TableModule,
    ],
    declarations: [...EDITCATEGORIAS_COMPONENTS],
})
export class EditCategoriasModule { }
