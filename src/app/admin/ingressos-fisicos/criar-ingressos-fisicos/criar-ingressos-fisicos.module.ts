import { NgModule } from '@angular/core';

import { CriarIngressosFisicosComponent } from './criar-ingressos-fisicos.component';
import { ThemeModule } from '../../../@theme-admin/theme.module';
import { TableModule } from '../../table/table.module';
import { FormIngressosModule } from '../form-ingressos/form-ingressos.module';

@NgModule({
  imports: [
    TableModule,
    ThemeModule,
    FormIngressosModule,
  ],
  exports: [CriarIngressosFisicosComponent],
  declarations: [CriarIngressosFisicosComponent],
})
export class CriarIngressosFisicosModule { }
