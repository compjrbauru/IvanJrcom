import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriaEventosComponent } from './categoria-eventos/categoria-eventos.component';
import { ShowCategoriaComponent } from './show-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: ShowCategoriaComponent,
  },
  {
    path: ':categoria',
    component: CategoriaEventosComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCategoriaRoutingModule { }
