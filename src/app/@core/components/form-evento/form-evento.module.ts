import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { FormEventoComponent } from './form-evento.component';

@NgModule({
  imports: [ThemeModule, CommonModule],
  declarations: [FormEventoComponent],
  exports: [FormEventoComponent],
})
export class FormEventoModule { }
