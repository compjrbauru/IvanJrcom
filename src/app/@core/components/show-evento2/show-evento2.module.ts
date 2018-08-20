import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { CommonModule } from '@angular/common';
import { ShowEvento2Component } from './show-evento2.component';

@NgModule({
  imports: [ThemeModule, CommonModule, RouterModule],
  declarations: [ShowEvento2Component],
  exports: [ShowEvento2Component],
})
export class ShowEvento2Module { }
