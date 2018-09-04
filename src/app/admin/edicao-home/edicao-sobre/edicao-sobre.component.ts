import { Component, OnInit, OnDestroy } from '@angular/core';
import { SobreService } from '../../../services/sobre.service';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'ngx-edicao-sobre',
  templateUrl: './edicao-sobre.component.html',
})
export class EdicaoSobreComponent implements OnInit, OnDestroy {
  sobre: any;
  sub: any;
  id: any;

  constructor(private sobreService: SobreService, private notificao: NotificacaoService) { }

  ngOnInit() {
    this.sub = this.sobreService.getAll().subscribe(res => {
      this.sobre = res[0]['sobre'];
      this.id = res[0]['id'];
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
}
