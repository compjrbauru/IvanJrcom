import { IngressosService } from './../../../services/ingressos.service';
import { NgModule } from '@angular/core';

import { IngressosGeradosComponent } from './ingressos-gerados.component';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { TableModule } from '../../table/table.module';
import { IngressosPdfModule } from '../ingressos-pdf/ingressos-pdf.module';

@NgModule({
  imports: [
    TableModule,
    ThemeModule,
    IngressosPdfModule,
  ],
  exports: [IngressosGeradosComponent],
  declarations: [IngressosGeradosComponent],
  providers: [IngressosService],
})
export class IngressosGeradosModule { }
