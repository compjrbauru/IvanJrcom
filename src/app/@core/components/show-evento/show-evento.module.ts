import { RouterModule } from '@angular/router';
import { ShowEventoComponent } from './show-evento.component';
import { NgModule } from '@angular/core';
import { ThemeModule } from './../../../@theme-home/theme.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ThemeModule, CommonModule, RouterModule],
  declarations: [ShowEventoComponent],
  exports: [ShowEventoComponent],
})
export class ShowEventoModule { }
