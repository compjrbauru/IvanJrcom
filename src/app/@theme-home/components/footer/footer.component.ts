import { Component, OnInit } from '@angular/core';
import { SobreService } from '../../../services/sobre.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  sobre;

  constructor( private sobreService: SobreService) { }

  ngOnInit(): void {
    this.sobreService.getSobre().subscribe(res => {
      this.sobre = res['sobre'];
    });
  }
}
