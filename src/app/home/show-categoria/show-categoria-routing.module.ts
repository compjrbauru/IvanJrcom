import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShowCategoriaComponent } from './show-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: ShowCategoriaComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCategoriaRoutingModule {}
