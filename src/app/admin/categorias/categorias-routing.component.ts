import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/can-deactivate-guard.service';
import { CategoriasComponent } from './categorias.component';
import { CreateCategoriasComponent } from './create-categorias/create-categorias.component';
import { EditCategoriasComponent } from './edit-categorias/edit-categorias.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriasComponent,
        children: [
            {
                path: 'create',
                component: CreateCategoriasComponent,
                canDeactivate: [CanDeactivateGuard],
            },
            {
                path: 'edit',
                component: EditCategoriasComponent,
                /* canDeactivate: [CanDeactivateGuard], */
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriasRoutingModule { }
