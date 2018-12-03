import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MapComponent } from '../../../@core/components/map/map.component';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { DepositoService } from '../../../services/deposito.service';
import { QueryService } from '../../../services/query.service';
// tslint:disable-next-line:max-line-length
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { UploadFileComponent } from './../../../@core/components/upload-file/upload-file.component';
import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  form: any = {};
  contasDeposito: any;
  dependencies: any;
  categoriaSelected: any = {};
  @ViewChild(MapComponent)
  private map: MapComponent;
  @ViewChild(UploadFileComponent)
  private upload: UploadFileComponent;
  private unsubscribeCategoria: Subject<void> = new Subject();
  private unsubscribeContasDeposito: Subject<void> = new Subject();

  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private queryservice: QueryService,
    private depositoservice: DepositoService,
  ) { }

  ngOnInit() {
    const categoriaAsync = this.categoriaService.getCategoria();
    const depositoAsync = this.depositoservice.getContaDeposito();
    this.dependencies = { categoria: categoriaAsync, deposito: depositoAsync };
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.addData(form);
    this.categoriaService.patchCategoria(form);

    alert('Evento criado com sucesso!');
    this.upload.resetUpload();
    this.map.resetMap();
    this.form['formEvent'].reset();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.form['formEvent'].value.pathurl !== '' &&
      this.form['formEvent'].value.pathurl !== null
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
            this.queryservice.deleteImage(this.form['formEvent'].value.pathurl);
          }
        }),
      );
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.unsubscribeCategoria.next();
    this.unsubscribeCategoria.complete();
    this.unsubscribeContasDeposito.next();
    this.unsubscribeContasDeposito.complete();
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
