import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MapComponent } from '../../../@core/components/map/map.component';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-guard.service';
import { QueryService } from '../../../services/query.service';
import { ConfirmationModalComponent } from './../../../@core/components/confirmation-modal/confirmation-modal.component';
import { UploadFileComponent } from './../../../@core/components/upload-file/upload-file.component';
import { CategoriaService } from './../../../services/categoria.service';
import { EventoService } from './../../../services/evento.service';

// tslint:disable-next-line:max-line-length
@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  form: any = {};
  categorias: any;
  categoriaSelected: any = {};
  @ViewChild(MapComponent)
  private map: MapComponent;
  @ViewChild(UploadFileComponent)
  private upload: UploadFileComponent;
  private unsubscribeCategoria: Subject<void> = new Subject();

  constructor(
    private eventoService: EventoService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private queryservice: QueryService,
  ) { }

  ngOnInit() {
    this.categoriaService
      .getCategoria()
      .pipe(takeUntil(this.unsubscribeCategoria))
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }

  submit(form: any) {
    form.data = new Date(form.data);
    form.nomeBusca = form.nome.toLowerCase();
    form.localBusca = form.local.toLowerCase();
    this.eventoService.addData(form);
    this.categoriaService.patchCategoria(this.categorias, form);

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
