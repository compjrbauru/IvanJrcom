import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { cloneDeep, find } from 'lodash';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

import { TableService } from './../../services/table.service';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class TableComponent implements OnInit, OnDestroy {
  @Input() dataAsync: Observable<any>; // Observable que indica para a busca dos objetos da tabela
  @Input() dataIdAsync: Observable<any>; // Observable que indica para busca de objeto com id especifico
  @Input() cat$: Subject<string>; // Subject que indica ID a ser buscado
  @Input() deleteData: any = [];
  @Input() columns: string; // Determina colunas mostradas
  @Input() titulo: string; // Determina titulo da table
  @Input() tipoId: string = 'id'; // Determina tipo do id a ser chamado
  @Input() edit: boolean = false; // Ativa ou desativa a edicao
  @Output() editE = new EventEmitter(); // Objeto com id especifico emitido para ser tratado no component pai
  @Output() editConfirm = new EventEmitter(); // Retorna objeto com informacoes sobre a linha editada
  private unsubscribeData: Subject<void> = new Subject();
  private unsubscribeDataId: Subject<void> = new Subject();
  keysSettings: any = [];
  dataSource: any = [];
  dataSync: any;
  source: LocalDataSource = new LocalDataSource();
  settings: any = [];
  editEvento: boolean = false;
  eventoResolved: any = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.setEdit(this.edit);
    this.settings = this.tableService.getColumns(this.columns);
    for (const key in this.settings.columns) {
      if (this.settings.columns[key]) {
        this.keysSettings.push(key);
      }
    }
    this.dataAsync.pipe(takeUntil(this.unsubscribeData)).subscribe(res => {
      this.dataSync = cloneDeep(res);
      this.dataSource = res.map(response => {
        for (const key in response) {
          if (!this.keysSettings.includes(key)) {
            delete response[key];
          }
        }
        return response;
      });
      this.source.load(this.dataSource);
    });
    this.dataIdAsync.pipe(takeUntil(this.unsubscribeDataId)).subscribe(response => {
      this.eventoResolved = response;
      const emitter = cloneDeep(this.eventoResolved);
      this.editE.emit(emitter);
      this.editEvento = true;
    });
  }

  onDelete(event): void {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  foundObject(event: any) {
    this.cat$.next(find(this.dataSync, event.data)[this.tipoId]);
  }

  emitConfirm(event: any) { // Emite o evento recebido da table com as info do evento escolhido
    const eventData = find(this.dataSync, event.data); // Informacoes necessarias do evento
    const resp = {
      event, // Dados sobre a edicao
      eventData,
    };
    this.editConfirm.emit(resp); // Emite o evento para ser tratado no pai
  }

  ngOnDestroy() {
    this.unsubscribeData.next();
    this.unsubscribeDataId.next();
    this.unsubscribeData.complete();
    this.unsubscribeDataId.complete();
    this.cat$.next();
    this.cat$.complete();
  }

}
