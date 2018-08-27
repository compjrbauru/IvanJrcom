import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { CommonModule } from '@angular/common';
import { ShowEvento2Component } from './show-evento2.component';
import { PaginacaoModule } from '../paginacao/paginacao.module';

@NgModule({
  imports: [ThemeModule, CommonModule, RouterModule, PaginacaoModule],
  declarations: [ShowEvento2Component],
  exports: [ShowEvento2Component],
})
export class ShowEvento2Module { }
