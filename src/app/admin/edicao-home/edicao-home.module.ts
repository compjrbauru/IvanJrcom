import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoHomeComponent } from './edicao-home.component';
import { EdicaoHomeRoutingModule } from './edicao-home-routing.module';

@NgModule({
  imports: [
    EdicaoHomeRoutingModule,
    CommonModule,
  ],
  declarations: [EdicaoHomeComponent]
})
export class EdicaoHomeModule { }
