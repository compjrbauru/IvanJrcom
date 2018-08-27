import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { PaginacaoComponent } from './paginacao.component';

@NgModule({
  imports: [ThemeModule, CommonModule, RouterModule],
  declarations: [PaginacaoComponent],
  exports: [PaginacaoComponent],
})
export class PaginacaoModule { }
