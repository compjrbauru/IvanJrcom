import { MostrarhomeModule } from './mostrarhome/mostrarhome.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoHomeComponent } from './edicao-home.component';
import { EdicaoHomeRoutingModule } from './edicao-home-routing.module';
import { EdicaoSobreModule } from './edicao-sobre/edicao-sobre.module';
import { ThemeModule } from '../../@theme-home/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    MostrarhomeModule,
    EdicaoSobreModule,
    EdicaoHomeRoutingModule,
    CommonModule,
  ],
  declarations: [EdicaoHomeComponent],
})
export class EdicaoHomeModule { }
