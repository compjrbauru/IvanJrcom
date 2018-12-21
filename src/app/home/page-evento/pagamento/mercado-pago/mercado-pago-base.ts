import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { OnChanges, SimpleChanges, Input } from '@angular/core';
import { config } from '../../../../config/config';

export interface UserObject {
  CPF: string;
  Cidade: string;
  Estado: string;
  RG: string;
  email: string;
  id: string;
  nascimento: string;
  nome: string;
  registroCompleto: boolean;
  sobrenome: string;
  telefone: Telefone;
}

export interface Telefone {
  dd: string;
  numero: string;
}

// Class com funcionalidades básicas para o sistema de pagamentos do MercadoPago
export abstract class MercadoPagoBase implements OnChanges {
    @Input() userData: UserObject;
    @Input() paymentData;
    doSubmit = false; // Para enviar as informações de pagamento apenas uma vez
    MERCADOPAGO: any;
    paymentForm: FormGroup;
    postLink = config.mercadopago.paymentLink; // Link do Firebase Functions para dar post com as informacoes de pagamento

    constructor() {
      this.MERCADOPAGO = (<any>window).Mercadopago;
      this.MERCADOPAGO.setPublishableKey(config.mercadopago.publicKey);
    }

    // Seta os campos descricao, valor e informacoes adicionais uma vez que os dados de compra estao disponiveis
    ngOnChanges(changes: SimpleChanges): void {
      if ('paymentData' in changes && this.paymentForm && changes.paymentData.currentValue) {
        // Set payment data in forms
        const data = changes.paymentData.currentValue;
        this.paymentForm.get('transaction_amount').setValue(data.valorTotal);
        this.paymentForm.get('description').setValue('Ingressos para ' + data.evento.nome);
        this.paymentForm.get('additional_info').get('items').setValue(this.createItemData(data));
      }
    }

    // Cria objeto de item para mandar para o MP
    createItemData(data) {
      const ingressos = data.ingressos;
      const items = [];
      for (const key in ingressos) {
        if (ingressos.hasOwnProperty(key)) {
          if (ingressos[key] > 0) {
            items.push({
              id: data.evento.id,
              title: data.evento.nome,
              picture_url: data.evento.url,
              description: 'Ingresso ' + key,
              category_id: 'tickets',
              quantity: ingressos[key],
              unit_price: data.evento.ingressos[key].valor,
            });
          }
        }
      }

      return items;
    }

    getHeaders() {
      return new HttpHeaders({
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':       'application/json',
      });
    }
}
