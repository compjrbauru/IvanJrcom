import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-show-evento2',
  templateUrl: './show-evento2.component.html',
  styleUrls: ['./show-evento2.component.scss'],
})
export class ShowEvento2Component implements OnInit {
  eventoAsync: Observable<any>;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getByNameWithLimit();
  }


//   var next = db.collection("cities")
//   .orderBy("population")
//   .startAfter(lastVisible)
//   .limit(25);
// });

}
