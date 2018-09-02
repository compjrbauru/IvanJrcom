import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TodosEventosComponent } from './todos-eventos.component';
import { TodosEventosRoutingModule } from './todos-eventos.routing';


@NgModule({
  imports: [TodosEventosRoutingModule, ThemeModule],
  declarations: [TodosEventosComponent],
  providers: [],
})
export class TodosEventosModule { }
