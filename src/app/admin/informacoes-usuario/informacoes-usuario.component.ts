import { NotificacaoService } from './../../services/notificacao.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-informacoes-usuario',
  templateUrl: './informacoes-usuario.component.html',
  styleUrls: ['./informacoes-usuario.component.scss'],
})
export class InformacoesUsuarioComponent implements OnInit {
  users: any;

  constructor(
    private usuario: UsuarioService,
    private notificacao: NotificacaoService,
  ) { }

  ngOnInit() {
    this.users = this.usuario.getAll();
  }

  editAccount(data) {
    this.usuario.patchUsuario(data.event.newData, data.event.newData.id).subscribe( () => {
      this.notificacao.ngxtoaster('Usuário', 'Editado com Sucesso!', true);
    }, fail => {
      this.notificacao.ngxtoaster('Usuário', 'Falha na edição: ' + fail, false);
    });
  }

}
