import { TableService } from './../../services/table.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalDataSource } from 'ng2-smart-table';
import { pluck, partition, mapTo, flatMap } from 'rxjs/operators';
import { map } from 'leaflet';

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
  @Input() deleteData: any = [];
  keysSettings: any = [];
  dataSource: any = [];
  source: LocalDataSource = new LocalDataSource();
  settings: any = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.settings = this.tableService.getColumnsEvento();
    for (const key in this.settings.columns) {
      if (this.settings.columns[key]) {
        this.keysSettings.push(key);
      }
    }
    this.dataAsync.subscribe(res => {
      this.dataSource = res.map(response => {
        for (const key in response) {
          if (!this.keysSettings.includes(key)) {
            delete response[key];
          }
        }
        return response;
      });
      console.log(this.dataSource);
      this.source.load(this.dataSource);
    });
  }

  onDelete(event): void {
    if (window.confirm('Tem certeza que deeseja deletar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
