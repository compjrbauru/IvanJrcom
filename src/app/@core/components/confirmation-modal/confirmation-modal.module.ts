import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
  imports: [ThemeModule, CommonModule],
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
})
export class ConfirmationModalModule {}
