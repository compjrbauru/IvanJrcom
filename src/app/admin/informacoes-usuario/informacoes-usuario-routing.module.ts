import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesUsuarioComponent } from './informacoes-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: InformacoesUsuarioComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacoesUsuarioRoutingModule { }
