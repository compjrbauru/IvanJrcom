import { Observable } from 'rxjs/Observable';
import { formatDate } from '@angular/common';
import { OnInit, Input, Component } from '@angular/core';
import * as jspdf from 'jspdf';
import * as QRCode from 'qrcode';
import { from } from 'rxjs/internal/observable/from';


@Component({
  selector: 'ngx-ingressos-pdf',
  templateUrl: './ingressos-pdf.component.html',
  styleUrls: ['./ingressos-pdf.component.scss'],
})
export class IngressosPdfComponent implements OnInit {
  @Input() ingresso: any;

  constructor() { }

  ngOnInit() { }

   gerarQRCode(text: string): Observable<any> {
      try {
        const url = from(QRCode.toDataURL(text));
        return url;
      } catch (err) {
        console.error(err);
      }

    }


  gerarPDF() {

    const pdf = new jspdf('p', 'mm', 'a4');

    let elementsY = 0;
    let borderY = 0;
    let lastIndex = '';

    for (const i in this.ingresso.ingressos) {
      if (this.ingresso.ingressos.hasOwnProperty(i))
        lastIndex = i;
    }

    for (const i of this.ingresso.ingressos) {

        this.gerarQRCode(i.id).subscribe(res => {
        pdf.rect(0, borderY, 210, 59.4, 's');
        borderY += 59.4;
        pdf.setFont('Courier');
        pdf.setFontStyle('bold');
        pdf.setFontSize(20);
        elementsY += 10;
        pdf.text(this.ingresso.nomeEvento, 105, elementsY, 'center');
        elementsY += 8;
        pdf.text(formatDate((this.ingresso.dataEvento.seconds * 1000), 'd MMM, y - HH:mm', 'en-US'),
          105, elementsY, 'center');
        pdf.addImage(res, 'PNG', 160, elementsY - 5, 35, 35);
        pdf.setFontStyle('normal');
        pdf.setFontSize(15);
        elementsY += 15;
        pdf.text('Tipo: ' + i.tipo, 12, elementsY);
        pdf.text('Valor: ' + i.valor.toString() + ' R$', 12, elementsY + 8);
        elementsY += 20;
        pdf.text(this.ingresso.idEvento, 198, elementsY, 'right');
        elementsY = borderY;
        if (borderY === 297) {
          pdf.addPage();
          elementsY = 0;
          borderY = 0;
        }
        if (i.id === this.ingresso.ingressos[lastIndex].id)
          pdf.save(this.ingresso.nomeEvento);
      });
    }
  }

}
