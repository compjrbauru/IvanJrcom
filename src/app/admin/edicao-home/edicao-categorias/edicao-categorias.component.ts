import { NotificacaoService } from './../../../services/notificacao.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'ngx-edicao-categorias',
  templateUrl: './edicao-categorias.component.html',
  styleUrls: ['./edicao-categorias.component.scss'],
})
export class EdicaoCategoriasComponent implements OnInit {
  categorias: Observable<any>;

  constructor(
    private categoriaService: CategoriaService,
    private notificao: NotificacaoService,
  ) { }

  ngOnInit() {
    this.categorias = this.categoriaService.getCategoria();
  }

  editcategoria(data) {
    const categoria = data.eventData;
    const nome = data.event.newData.nome;
    const old = data.event.newData.showhome;

    categoria.nome = nome;
    const res = old === 'true' || old === true ? true : false;
    categoria.showhome = res;
    this.categoriaService.patchCategoriaEvento(categoria).then(ok => {
      this.notificao.ngxtoaster('Categoria', 'Categoria editada com sucesso!', true);
    }).catch(fail => {
      this.notificao.ngxtoaster('Categoria', 'Categoria editada com sucesso!', true);
    });
  }

}
