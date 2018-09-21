import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme-admin/theme.module';
import { CategoriasRoutingModule } from './categorias-routing.component';
import { CategoriasComponent } from './categorias.component';
import { CreateCategoriasModule } from './create-categorias/create-categorias.module';
import { EditCategoriasModule } from './edit-categorias/edit-categorias.module';

const CATEGORIAS_COMPONENTS = [CategoriasComponent];

@NgModule({
    imports: [
        ThemeModule,
        CategoriasRoutingModule,
        EditCategoriasModule,
        CreateCategoriasModule,
    ],
    declarations: [CATEGORIAS_COMPONENTS],
})
export class CategoriasModule { }
