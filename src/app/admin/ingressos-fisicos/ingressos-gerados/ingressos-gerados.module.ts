import { TableModule } from './../../table/table.module';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme-admin/theme.module';
import { IngressosGeradosComponent } from './ingressos-gerados.component';


@NgModule({
  imports: [ThemeModule, TableModule],
  declarations: [IngressosGeradosComponent],
})
export class IngressosGeradosModule {}
