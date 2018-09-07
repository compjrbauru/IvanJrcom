import { Component, OnInit, OnDestroy } from '@angular/core';
import { SobreService } from '../../../services/sobre.service';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'ngx-edicao-sobre',
  templateUrl: './edicao-sobre.component.html',
})
export class EdicaoSobreComponent implements OnInit, OnDestroy {
  sobre: any; // Contem o texto a ser atualizado
  sub: any;
  id: any;
  initialeditortext = 'Carregando Texto...';

  constructor(private sobreService: SobreService, private notificao: NotificacaoService) { }

  ngOnInit() {
    this.sub = this.sobreService.getSobre().subscribe(res => {
    this.sobre = res['sobre'];
    this.id = res['id'];

    this.initialeditortext = this.sobre;
    });
  }

  submit() {
    this.sobreService.patchSobre(this.id, this.sobre).then(res => {
      this.notificao.ngxtoaster('Editar Sobre', 'Editado com Sucesso!', true);
    }).catch(err => {
      this.notificao.ngxtoaster('Editar Sobre', 'Falha na edição!', false);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getData(text) { // Recebe o evento de tecla do editor de texto e joga na variavel
    this.sobre = text;
  }
}
