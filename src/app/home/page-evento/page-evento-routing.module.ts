import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageEventoComponent } from './page-evento.component';

const routes: Routes = [
  {
    path: '',
    component: PageEventoComponent,
  },
  {
    path: 'comprar',
    loadChildren: './pagamento/pagamento.module#PagamentoModule',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEventoRoutingModule {}
