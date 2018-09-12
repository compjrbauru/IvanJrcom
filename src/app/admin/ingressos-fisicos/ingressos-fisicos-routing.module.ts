import { IngressosGeradosComponent } from './ingressos-gerados/ingressos-gerados.component';
import { IngressosFisicosComponent } from './ingressos-fisicos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'gerar-ingressos-fisicos',
    component: IngressosFisicosComponent,
  },
  {
    path: 'ingressos-gerados',
    component: IngressosGeradosComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngressosFisicosRoutingModule {}
