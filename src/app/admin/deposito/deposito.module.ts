import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-admin/theme.module';
import { CreateDepositoModule } from './create-deposito/create-deposito.module';
import { DepositoRoutingModule } from './deposito-routing.component';
import { DepositoComponent } from './deposito.component';
import { DepositosAtivosModule } from './depositos-ativos/depositos-ativos.module';
import { EditDepositoModule } from './edit-deposito/edit-deposito.module';

const DEPOSITO_COMPONENTS = [DepositoComponent];

@NgModule({
    imports: [
        ThemeModule,
        DepositoRoutingModule,
        EditDepositoModule,
        CreateDepositoModule,
        DepositosAtivosModule,
    ],
    declarations: [DEPOSITO_COMPONENTS],
})
export class DepositoModule { }
