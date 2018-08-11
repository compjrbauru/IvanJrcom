import { TableService } from './../../services/table.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  @Input() deleteData: any;

  constructor(private tableService: TableService) { }

  ngOnInit() {

  }

  onDelete(event): void {
    if (window.confirm('Tem certeza que deeseja deletar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
