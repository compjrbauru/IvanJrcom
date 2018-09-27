import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeModule } from '../../../@theme/theme.module';
import { CategoriasDestaqueComponent } from './categorias-destaque.component';


const CATEGORIASDESTAQUE_COMPONENTS = [CategoriasDestaqueComponent];

@NgModule({
    imports: [ThemeModule, RouterModule],
    declarations: [...CATEGORIASDESTAQUE_COMPONENTS],
    exports: [...CATEGORIASDESTAQUE_COMPONENTS],
})

export class CategoriasDestaquModule { }
