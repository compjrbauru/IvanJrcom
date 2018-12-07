import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserResolverService } from '../../../services/user-resolver.service';
import { PagamentoComponent } from './pagamento.component';

const routes: Routes = [
  {
    path: '',
    component: PagamentoComponent,
    resolve: { userInfo: UserResolverService },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UserResolverService,
  ],
})
export class PagamentoRoutingModule { }
