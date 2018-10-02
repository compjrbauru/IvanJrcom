import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDepositoComponent } from './create-deposito/create-deposito.component';
import { DepositoComponent } from './deposito.component';
import { DepositosAtivosComponent } from './depositos-ativos/depositos-ativos.component';
import { EditDepositoComponent } from './edit-deposito/edit-deposito.component';

const routes: Routes = [
    {
        path: '',
        component: DepositoComponent,
        children: [
            {
                path: 'create',
                component: CreateDepositoComponent,
            },
            {
                path: 'edit',
                component: EditDepositoComponent,
            },
            {
                path: 'ativos',
                component: DepositosAtivosComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepositoRoutingModule { }
