import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { FormDepositoModule } from './../../../@core/components/form-deposito/form-deposito.module';
import { CreateDepositoComponent } from './create-deposito.component';

const CREATEDEPOSITO_COMPONENTS = [CreateDepositoComponent];

@NgModule({
    imports: [
        ThemeModule,
        FormDepositoModule,
    ],
    declarations: [...CREATEDEPOSITO_COMPONENTS],
})
export class CreateDepositoModule { }
