import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { DepositosAtivosComponent } from './depositos-ativos.component';



const DEPOSITOATIVOS_COMPONENTS = [DepositosAtivosComponent];

@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [...DEPOSITOATIVOS_COMPONENTS],
})
export class DepositosAtivosModule { }
