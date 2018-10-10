import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CategoriaEventosModule } from './categoria-eventos/categoria-eventos.module';
import { ShowCategoriaRoutingModule } from './show-categoria-routing.module';
import { ShowCategoriaComponent } from './show-categoria.component';


@NgModule({
  imports: [ThemeModule, CommonModule, ShowCategoriaRoutingModule, CategoriaEventosModule],
  declarations: [ShowCategoriaComponent],
})
export class ShowCategoriaModule { }
