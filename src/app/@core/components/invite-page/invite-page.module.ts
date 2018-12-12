import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { ThemeModule } from './../../../@theme-home/theme.module';
import { InvitePageComponent } from './invite-page.component';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [ThemeModule, CommonModule, QRCodeModule, PipesModule],
  declarations: [InvitePageComponent],
  exports: [InvitePageComponent],
})
export class InvitePageModule {}
