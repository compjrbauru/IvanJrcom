import { IngressosPdfModule } from './../ingressos-pdf/ingressos-pdf.module';
import { TableModule } from './../../table/table.module';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { IngressosGeradosComponent } from './ingressos-gerados.component';


@NgModule({
  imports: [ThemeModule, TableModule, IngressosPdfModule],
  declarations: [IngressosGeradosComponent],
})
export class IngressosGeradosModule {}
