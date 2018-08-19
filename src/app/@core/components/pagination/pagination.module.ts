import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [ThemeModule, CommonModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
