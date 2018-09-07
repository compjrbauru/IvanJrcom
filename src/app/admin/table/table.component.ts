import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import { find, cloneDeep } from 'lodash';
import { TableService } from './../../services/table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
<<<<<<< f3c7b342060af838332fc5302ef25b79b8963f13
  @Input() deleteData: any = [];
  @Input() columns: string; // Determina colunas mostradas
  @Input() edit: boolean = false; // Ativa ou desativa a edicao
  @Output() editE = new EventEmitter(); // Objeto com id especifico emitido para ser tratado no component pai
  @Output() editConfirm = new EventEmitter(); // Retorna objeto com informacoes sobre a linha editada
=======
  @Input() collect: string;
  @Output() editE = new EventEmitter(); // Objeto com id especifico emitido para ser tratado no component pai
  private unsubscribeData: Subject<void> = new Subject();
  private unsubscribeDataId: Subject<void> = new Subject();
  source: LocalDataSource = new LocalDataSource();
>>>>>>> #160239411: Unsubscribe nas observables
  keysSettings: any = [];
  dataSource: any = [];
  dataSync: any;
  settings: any = [];
  eventoResolved: any = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
<<<<<<< f3c7b342060af838332fc5302ef25b79b8963f13
    this.tableService.setEdit(this.edit);
    this.settings = this.tableService.getColumns(this.columns);
=======
    this.settings = this.tableService.getColumns(this.collect);
>>>>>>> #160239411: Unsubscribe nas observables
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
    });
  }

  foundObject(event: any) {
    this.cat$.next(find(this.dataSync, event.data).id);
  }

<<<<<<< f3c7b342060af838332fc5302ef25b79b8963f13
  emitConfirm(event: any) { // Emite o evento recebido da table com as info do evento escolhido
    const eventData = find(this.dataSync, event.data); // Informacoes necessarias do evento
    const resp = {
      event, // Dados sobre a edicao
      eventData,
    };
    this.editConfirm.emit(resp); // Emite o evento para ser tratado no pai
=======
  ngOnDestroy() {
    this.unsubscribeData.next();
    this.unsubscribeData.complete();
    this.unsubscribeDataId.next();
    this.unsubscribeDataId.complete();
>>>>>>> #160239411: Unsubscribe nas observables
  }

}
