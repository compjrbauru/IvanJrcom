import { FormIngressosModule } from './form-ingressos/form-ingressos.module';
import { ThemeModule } from './../../@theme-admin/theme.module';
import { TableModule } from './../table/table.module';
import { IngressosFisicosRoutingModule } from './ingressos-fisicos-routing.module';
import { IngressosFisicosComponent } from './ingressos-fisicos.component';
import { NgModule } from '@angular/core';
import { IngressosGeradosComponent } from './ingressos-gerados/ingressos-gerados.component';
import { IngressosGeradosModule } from './ingressos-gerados/ingressos-gerados.module';

@NgModule({
    imports: [IngressosFisicosRoutingModule, TableModule, ThemeModule, FormIngressosModule, IngressosGeradosModule],
    declarations: [IngressosFisicosComponent],
  })
  export class IngressosFisicosModule {}
