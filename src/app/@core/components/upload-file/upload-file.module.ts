import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropZoneDirective } from '../../../directives/dropZone/drop-zone.directive';
import { FileSizePipe } from '../../../pipes/fileSize/file-size.pipe';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { UploadFileComponent } from './upload-file.component';

@NgModule({
  imports: [ThemeModule, CommonModule],
  declarations: [UploadFileComponent, FileSizePipe, DropZoneDirective],
  exports: [UploadFileComponent],
})
export class UploadFileModule {}
