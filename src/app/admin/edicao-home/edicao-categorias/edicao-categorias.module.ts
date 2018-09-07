import { NotificacaoService } from './../../../services/notificacao.service';
import { CategoriaService } from './../../../services/categoria.service';
import { TableModule } from './../../table/table.module';
import { NgModule } from '@angular/core';
import { EdicaoCategoriasComponent } from './edicao-categorias.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [ThemeModule, TableModule],
  declarations: [EdicaoCategoriasComponent],
  providers: [CategoriaService, NotificacaoService],
  exports: [EdicaoCategoriasComponent],
})
export class EdicaoCategoriasModule { }
