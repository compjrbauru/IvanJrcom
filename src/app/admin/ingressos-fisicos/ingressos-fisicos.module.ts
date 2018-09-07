import { ThemeModule } from './../../@theme-admin/theme.module';
import { TableModule } from './../table/table.module';
import { IngressosFisicosRoutingModule } from './ingressos-fisicos-routing.module';
import { IngressosFisicosComponent } from './ingressos-fisicos.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [IngressosFisicosRoutingModule, TableModule, ThemeModule],
    declarations: [IngressosFisicosComponent],
  })
  export class IngressosFisicosModule {}
