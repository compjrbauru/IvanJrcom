import { CriarIngressosFisicosModule } from './criar-ingressos-fisicos/criar-ingressos-fisicos.module';
import { ThemeModule } from './../../@theme-admin/theme.module';
import { NgModule } from '@angular/core';
import { IngressosFisicosRoutingModule } from './ingressos-fisicos-routing.module';
import { IngressosGeradosModule } from './ingressos-gerados/ingressos-gerados.module';

@NgModule({
    imports:
    [
      ThemeModule,
      IngressosFisicosRoutingModule,
      CriarIngressosFisicosModule,
      IngressosGeradosModule,
    ],
  })
  export class IngressosFisicosModule {}
