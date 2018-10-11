import { formatDate } from '@angular/common';
import { EventoService } from './../../../services/evento.service';
import { OnInit, Input, OnChanges, SimpleChanges, Component } from '@angular/core';
import * as jspdf from 'jspdf';
import * as QRCode from 'qrcode';
import { createElement } from '@angular/core/src/view/element';


@Component({
  selector: 'ngx-ingressos-pdf',
  templateUrl: './ingressos-pdf.component.html',
  styleUrls: ['./ingressos-pdf.component.scss'],
})
export class IngressosPdfComponent implements OnInit, OnChanges {
  @Input() evento: any;
  @Input() ingresso: any;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.resolveEvento();
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.resolveEvento();
  }

  resolveEvento() {
    const evento = this.eventoService.getID(this.ingresso.idEvento).subscribe(res => {
      this.evento = res[0];
      evento.unsubscribe();
    });
  }

  async gerarQRCode(text: string): Promise<any> {
      try {
        const url = await QRCode.toDataURL(text);
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

    for(let i in this.ingresso.ingressos) {
      lastIndex = i;
    }

    for(let i of this.ingresso.ingressos) {

      this.gerarQRCode(i.id).then(res => {
        pdf.rect(0, borderY, 210, 59.4, 's');
        borderY += 59.4;
        pdf.setFont('Courier');
        pdf.setFontStyle('bold');
        pdf.setFontSize(20);
        elementsY += 10;
        pdf.text(this.evento.nome, 105, elementsY, 'center');
        elementsY += 8;
        pdf.text(formatDate((this.evento.data.seconds * 1000), 'd MMM, y - HH:mm', 'en-US'), 105, elementsY, 'center');
        pdf.addImage(res, 'PNG', 160, elementsY - 5, 35, 35);
        pdf.setFontStyle('normal');
        pdf.setFontSize(15);
        elementsY += 15;
        pdf.text('Tipo: ' + i.tipo, 12, elementsY);
        pdf.text('Valor: ' + i.valor.toString() + ' R$', 12, elementsY + 8);
        elementsY += 20;
        pdf.text(this.evento.id, 198, elementsY, 'right');
        elementsY = borderY;
        if(borderY === 297) {
          pdf.addPage();
          elementsY = 0;
          borderY = 0;
        }
        if(i.id === this.ingresso.ingressos[lastIndex].id)
          pdf.save(this.evento.nome);
      });
    }
  }

}
