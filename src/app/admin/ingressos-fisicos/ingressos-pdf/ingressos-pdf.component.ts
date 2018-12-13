import { IngressosService } from './../../../services/ingressos.service';
import { Observable } from 'rxjs/Observable';
import { formatDate } from '@angular/common';
import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import * as jspdf from 'jspdf';
import * as QRCode from 'qrcode';
import { from } from 'rxjs/internal/observable/from';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'ngx-ingressos-pdf',
  templateUrl: './ingressos-pdf.component.html',
  styleUrls: ['./ingressos-pdf.component.scss'],
})
export class IngressosPdfComponent implements OnChanges {
  @Input() resolvedIngressoGerados: any;
  ingresso: any;
  ingressos: any;
  hasIngressos: boolean = false;

  constructor(
    private ingressosService: IngressosService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('resolvedIngressoGerados' in changes && !changes.resolvedIngressoGerados.firstChange) {
      this.criaModelo();
    }
  }

  criaModelo() {
    this.hasIngressos = false;
    combineLatest(
      this.ingressosService.getAllfisicos(this.resolvedIngressoGerados),
      this.ingressosService.transformIdIn(this.resolvedIngressoGerados.idEvento, 'nome'),
      this.ingressosService.transformIdIn(this.resolvedIngressoGerados.idEvento, 'data'),
    ).subscribe(([ingressos, nomeEvento, data]): any => {
      this.ingresso = { ...ingressos[0], nomeEvento: nomeEvento, dataEvento: data };
      this.ingressos = ingressos;
      this.hasIngressos = true;
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

    lastIndex = this.ingressos[this.ingressos.length - 1].id;

    this.ingressos.forEach(ingresso => {
      this.gerarQRCode(ingresso.id).subscribe(res => {
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
        pdf.text('Tipo: ' + ingresso.tipo, 12, elementsY);
        pdf.text('Valor: ' + ingresso.valor.toString() + ' R$', 12, elementsY + 8);
        elementsY += 20;
        elementsY = borderY;
        if (borderY === 297) {
          pdf.addPage();
          elementsY = 0;
          borderY = 0;
        }
        if (ingresso.id === lastIndex)
          pdf.save(this.ingresso.nomeEvento);
      });
      // pdf.save(this.ingresso.nomeEvento);
    });

  }

}
