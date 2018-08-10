import { QueryService } from './../../services/query.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-show-evento',
  templateUrl: './show-evento.component.html',
  styleUrls: ['./show-evento.component.scss'],
  providers: [QueryService],
})
export class ShowEventoComponent implements OnInit {
  eventos: any;
  constructor(private queryService: QueryService) { }

  ngOnInit() {
    const name$ = new Subject<any>();
    this.queryService.eventoOrder(name$).subscribe(response => {
      this.eventos = response;
    });
    name$.next('data');
  }

}
