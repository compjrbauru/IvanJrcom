import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCompraComponent } from './user-compra.component';

const routes: Routes = [
    {
        path: '',
        component: UserCompraComponent,
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserCompraRoutingModule { }
