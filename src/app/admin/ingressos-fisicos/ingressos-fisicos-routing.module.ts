import { IngressosFisicosComponent } from './ingressos-fisicos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'gerar-ingressos-fisicos',
    component: IngressosFisicosComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngressosFisicosRoutingModule {}
