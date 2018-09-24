import { Component, OnInit } from '@angular/core';
import { SobreService } from '../../../services/sobre.service';

@Component({
  selector: 'ngx-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.scss'],
})
export class SobreNosComponent implements OnInit {

  constructor(private sobreService: SobreService) { }
  sobre: any;

  ngOnInit() {
    this.sobreService.getSobre().subscribe(res => {
      this.sobre = res['sobre'];
    });
  }

}
