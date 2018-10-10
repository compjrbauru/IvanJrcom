import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { PaginacaoModule } from './../../../@core/components/paginacao/paginacao.module';
import { ShowEventoModule } from './../../../@core/components/show-evento/show-evento.module';
import { CategoriaEventosComponent } from './categoria-eventos.component';


@NgModule({
    imports: [
        ThemeModule,
        PaginacaoModule,
        ShowEventoModule,
    ],
    declarations: [CategoriaEventosComponent],
    providers: [],
})
export class CategoriaEventosModule { }
