import { IngressosService } from './../../../services/ingressos.service';
import { Observable } from 'rxjs/Observable';
import { formatDate } from '@angular/common';
import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import * as jspdf from 'jspdf';
import * as QRCode from 'qrcode';
import { from } from 'rxjs/internal/observable/from';


@Component({
  selector: 'ngx-ingressos-pdf',
  templateUrl: './ingressos-pdf.component.html',
  styleUrls: ['./ingressos-pdf.component.scss'],
})
export class IngressosPdfComponent implements OnChanges {
  @Input() resolvedIngressoGerados: any;
  ingresso: any;

  constructor(
    private ingressosService: IngressosService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('resolvedIngressoGerados' in changes && !changes.resolvedIngressoGerados.firstChange) {
      this.criaModelo();
    }
  }

  criaModelo() {
    this.ingressosService.getOne(this.resolvedIngressoGerados.ingressos[0]).subscribe(response => {
      console.log(response);
      this.ingresso = response;
    });
  }

  gerarQRCode(text: string): Observable<any> {
    const url = from(QRCode.toDataURL(text));
    return url;
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
