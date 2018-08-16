import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { enterUp } from '../../animations/animations';
import { QueryService } from './../../../services/query.service';

@Component({
  selector: "ngx-show-evento",
  templateUrl: "./show-evento.component.html",
  styleUrls: ["./show-evento.component.scss"],
  providers: [QueryService],
  animations: [enterUp("teste", "1000ms")]
})
export class ShowEventoComponent implements OnInit {
  eventos: any;
  constructor(private queryService: QueryService) {}

  ngOnInit() {
    const order$ = new Subject<any>();
    this.queryService.eventoOrder(order$).subscribe(response => {
      this.eventos = response;
    });
    order$.next("nome");
  }
}
