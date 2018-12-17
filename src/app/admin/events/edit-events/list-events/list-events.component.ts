import { NotificacaoService } from './../../../../services/notificacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { tap, switchMap, filter } from 'rxjs/operators';

// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from '../../../../@core/components/confirmation-modal/confirmation-modal.component';
import { UploadFileComponent } from '../../../../@core/components/upload-file/upload-file.component';
import { CategoriaService } from '../../../../services/categoria.service';
import { DepositoService } from '../../../../services/deposito.service';
import { MapComponent } from './../../../../@core/components/map/map.component';
import { EventoService } from './../../../../services/evento.service';
import { QueryService } from './../../../../services/query.service';

@Component({
  selector: 'ngx-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit {
  form: any = {};
  formDeleteValue: any = [];
  categorias: any;
  categoria: any;
  eventoAsync: Observable<any>;
  eventoResolver: any = [];
  dependencies: any;
  update: any;
  @ViewChild(UploadFileComponent) private upload: UploadFileComponent;
  @ViewChild(MapComponent) private map: MapComponent;
  categoriaSelected: any = {};

  constructor(
    private eventoService: EventoService,
    private queryService: QueryService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private depositoservice: DepositoService,
    private notificacaoService: NotificacaoService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
    const categoriaAsync = this.categoriaService.getCategoria();
    const depositoAsync = this.depositoservice.getContaDeposito();
    this.dependencies = { categoria: categoriaAsync, deposito: depositoAsync };
  }

  resolver(event) {
    this.eventoResolver = event;
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    if (form.pathurl !== this.eventoResolver.pathurl) {
      this.queryService.deleteImage(this.eventoResolver.pathurl).subscribe();
    }
    this.update = this.eventoService.patchData(form, this.eventoResolver.id);
    this.categoriaService.patchEditCategoria(form, this.eventoResolver);

    this.notificacaoService.ngxtoaster('Aviso', 'Evento editado com sucesso!', true);

    this.eventoResolver = [];
    this.form['formEvent'].reset();
    this.upload.resetUpload();
    this.map.resetMap();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formEvent'].value.pathurl !== '' &&
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
            this.queryService.deleteImage(this.form['formEvent'].value.pathurl).subscribe();
          }
        }),
      );
    } else {
      return true;
    }
  }

  deleteEvento(formValue: any) {
    this.formDeleteValue = formValue;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '40%',
      data: {
        header: 'Aviso!',
        text: 'Se você excluir o evento excluirá todos os registros ligados à este evento como: ingressos, imagens e registros de compra, tem certeza que deseja excluir?',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().pipe(
      filter(response => response === true),
      switchMap(() => this.categoriaService.getById(this.formDeleteValue.categoria)),
      tap(this.patchDeleteCategoria),
      tap(this.deleteImage),
      switchMap(() => this.eventoService.removeDataCascade(this.formDeleteValue.id)),
    ).subscribe(() => {
      this.eventoService.removeData(this.formDeleteValue.id);
    });
  }

  private patchDeleteCategoria = (categoria: any): void => {
    this.categoriaService.patchDeleteEventCategoria(categoria, this.formDeleteValue);
  }

  private deleteImage = (): void => {
    if (this.form['formEvent'].value.pathurl !== '' && this.form['formEvent'].value.pathurl !== this.eventoResolver.pathurl) {
      this.queryService.deleteImage(this.formDeleteValue.pathurl).pipe(
        switchMap(() => this.queryService.deleteImage(this.eventoResolver.pathurl)),
      ).subscribe();
    } else {
      this.queryService.deleteImage(this.eventoResolver.pathurl).subscribe();
    }
  }

  mapUpdate(event: any) {
    this.form['formEvent'].controls['local'].setValue(event.local);
    this.form['formEvent'].controls['coordenadas'].setValue(event.coordenadas);
  }

  imagemupdate(event: any) {
    this.form['formEvent'].controls['url'].setValue(event.url);
    this.form['formEvent'].controls['pathurl'].setValue(event.pathurl);
  }
}
