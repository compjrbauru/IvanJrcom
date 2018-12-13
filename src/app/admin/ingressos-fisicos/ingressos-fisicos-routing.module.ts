import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IngressosGeradosComponent } from './ingressos-gerados/ingressos-gerados.component';
import { CriarIngressosFisicosComponent } from './criar-ingressos-fisicos/criar-ingressos-fisicos.component';


const routes: Routes = [
  {
    path: 'ingressos-gerados',
    component: IngressosGeradosComponent,
  },
  {
    path: 'criar-ingressos-fisicos',
    component: CriarIngressosFisicosComponent,
  },
  { path: '**', redirectTo: 'ingressos-gerados' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngressosFisicosRoutingModule {}
