import { InformacoesUsuarioRoutingModule } from './informacoes-usuario-routing.module';
import { UsuarioService } from './../../services/usuario.service';
import { TableModule } from './../table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacoesUsuarioComponent } from './informacoes-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    InformacoesUsuarioRoutingModule,
  ],
  declarations: [
    InformacoesUsuarioComponent,
  ],
  providers: [
    UsuarioService,
  ],
})
export class InformacoesUsuarioModule { }
