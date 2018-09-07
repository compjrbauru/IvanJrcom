import { UploadFileModule } from './../../../@core/components/upload-file/upload-file.module';
import { ThemeModule } from './../../../@theme-admin/theme.module';
import { FormIngressosComponent } from './form-ingressos.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [ThemeModule, CommonModule, UploadFileModule],
  declarations: [FormIngressosComponent],
  exports: [FormIngressosComponent],
})
export class FormIngressosModule {}