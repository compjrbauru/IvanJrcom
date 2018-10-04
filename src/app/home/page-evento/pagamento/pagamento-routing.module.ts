import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepositoConfirmationComponent } from './deposito-confirmation/deposito-confirmation.component';
import { PagamentoComponent } from './pagamento.component';

const routes: Routes = [
  {
    path: '',
    component: PagamentoComponent,
  },
  {
    path: 'deposito',
    component: DepositoConfirmationComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagamentoRoutingModule { }
