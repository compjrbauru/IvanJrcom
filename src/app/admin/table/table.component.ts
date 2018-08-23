import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import { find, cloneDeep } from 'lodash';
import { TableService } from './../../services/table.service';
import { Subject } from 'rxjs';

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

export class TableComponent implements OnInit {
  @Input() dataAsync: Observable<any>;
  @Input() dataIdAsync: Observable<any>;
  @Input() cat$: Subject<string>;
  @Input() deleteData: any = [];
  @Output() editE = new EventEmitter();
  keysSettings: any = [];
  dataSource: any = [];
  dataSync: any;
  source: LocalDataSource = new LocalDataSource();
  settings: any = [];
  editEvento: boolean = false;
  eventoResolved: any = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.settings = this.tableService.getColumnsEvento();
    for (const key in this.settings.columns) {
      if (this.settings.columns[key]) {
        this.keysSettings.push(key);
      }
    }
    this.dataAsync.subscribe(res => {
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
    this.dataIdAsync.subscribe(response => {
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
    this.cat$.next(find(this.dataSync, event.data).id);
  }

}
