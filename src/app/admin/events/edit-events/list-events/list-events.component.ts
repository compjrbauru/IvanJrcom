import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { takeUntil, tap } from 'rxjs/operators';

// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from '../../../../@core/components/confirmation-modal/confirmation-modal.component';
import { CategoriaService } from '../../../../services/categoria.service';
import { EventoService } from './../../../../services/evento.service';
import { QueryService } from './../../../../services/query.service';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit, OnDestroy {
  form: any = {};
  categorias: any;
  categoria: any;
  eventoAsync: Observable<any>;
  eventoIdAsync: Observable<any>;
  eventoResolver: any = [];
  catID$ = new Subject<string>();
  formReset = false;
  private unsubscribeCategoria: Subject<void> = new Subject();
  categoriaSelected: any = {};

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    this.catID$.next('');
    this.eventoIdAsync = this.queryService.eventoIdAsync(this.catID$);
    this.categoriaService
      .getCategoria()
      .pipe(takeUntil(this.unsubscribeCategoria))
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }

  resolver(event) {
    this.eventoResolver = event ? event[0] : null;
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    if (form.pathurl !== this.eventoResolver.pathurl) {
      this.queryService.deleteImage(this.eventoResolver.pathurl).subscribe();
    }
    this.eventoService.patchData(form, this.eventoResolver.id);
    this.categoriaService.patchCategoria(this.categorias, form);

    alert('Evento editado com sucesso!');
    this.formReset = !this.formReset;
    this.eventoResolver = [];
    this.form['formEvent'].reset();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formEvent'] &&
      this.form['formEvent'].value.pathurl !== this.eventoResolver.pathurl
    ) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '40%',
        data: {
          header: 'Aviso!',
          text: 'Você enviou uma imagem, tem certeza que deseja sair?',
        },
        disableClose: true,
      });
      return dialogRef.afterClosed().pipe(
        tap(res => {
          if (res === true) {
            this.queryService.deleteImage(this.form['formEvent'].value.pathurl);
          }
        }),
      );
    } else {
      return true;
    }
  }
  deleteForm(form: any) {
    this.categoriaService
      .searchrcategoriabynome(form.categoria)
      .subscribe(categoria => {
        [this.categoria] = categoria;
        this.categoriaService.patchDeleteEventCategoria(this.categoria, form);
        this.eventoService.removeData(form.id);
        this.queryService.deleteImage(form.pathurl);
      });
  }

  ngOnDestroy() {
    this.unsubscribeCategoria.next();
    this.unsubscribeCategoria.complete();
  }
}
