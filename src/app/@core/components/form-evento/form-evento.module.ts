import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UploadFileModule } from '../upload-file/upload-file.module';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { FormEventoComponent } from './form-evento.component';

@NgModule({
  imports: [ThemeModule, CommonModule, UploadFileModule],
  declarations: [FormEventoComponent],
  exports: [FormEventoComponent],
})
export class FormEventoModule {}
