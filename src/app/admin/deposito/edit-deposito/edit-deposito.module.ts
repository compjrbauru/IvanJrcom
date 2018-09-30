import { NgModule } from '@angular/core';

import { FormDepositoModule } from '../../../@core/components/form-deposito/form-deposito.module';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { TableModule } from './../../table/table.module';
import { EditDepositoComponent } from './edit-deposito.component';



const EDITDEPOSITO_COMPONENTS = [EditDepositoComponent];

@NgModule({
    imports: [
        ThemeModule,
        FormDepositoModule,
        TableModule,
    ],
    declarations: [...EDITDEPOSITO_COMPONENTS],
})
export class EditDepositoModule { }
