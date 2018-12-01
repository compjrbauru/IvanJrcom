import { Component, Input, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'ngx-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss'],
})
export class InvitePageComponent implements OnInit {
  @Input()
  evento: any;
  constructor() {}

  ngOnInit() {}

  gerarPDF() {
    const ingresso = document.getElementById('ingresso');
    html2canvas(ingresso).then(canvas => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.evento.id);
    });
  }
}
