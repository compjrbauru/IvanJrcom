import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { config } from '../../../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ngx-mercadopago-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss'],
})
export class CartaoComponent implements OnInit, OnChanges {
  @Input() userData;
  @Input() paymentData;
  @ViewChild('payForm') HTML_PAY_FORM;
  MERCADOPAGO: any;
  doSubmit = false;
  paymentMethodControl: AbstractControl;
  cardForm: FormGroup;
  postLink = config.mercadopago.paymentLink;
  parcelas;
  paymentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.MERCADOPAGO = (<any>window).Mercadopago;
    this.MERCADOPAGO.setPublishableKey(config.mercadopago.publicKey);
    this.MERCADOPAGO.getIdentificationTypes();

    // Form para ser usado com o SDK do mercado livre para gerar um token do cartao de uso único
    this.cardForm = this.formBuilder.group({
      cardNumber: ['4509 9535 6623 3704', Validators.required],
      securityCode: ['123', Validators.required],
      cardExpirationMonth: ['12', Validators.required],
      cardExpirationYear: ['2019', Validators.required],
      cardholderName: ['APRO', Validators.required],
      // docType: ['', Validators.required],
      docNumber: ['12284475459', Validators.required],
      paymentMethodId: ['', Validators.required],
    });

    // Form com todos os dados para enviar para o beq
    this.paymentForm = this.formBuilder.group({
      payer: this.formBuilder.group({
        email: ['test_user_19653727@testuser.com', Validators.required],
      }),
      token: ['', Validators.required],
      issuer_id: [],
      installments: [, Validators.required],
      payment_method_id: [, Validators.required],
      transaction_amount: [, Validators.required],
      description: [, Validators.required],
      statement_descriptor: ['IVAN EVENTOS', Validators.required],
      additional_info: this.formBuilder.group({
        items: [, Validators.required],
        payer: this.formBuilder.group({
          first_name: [this.userData.nome, Validators.required],
          last_name: [this.userData.sobrenome, Validators.required],
          phone: this.formBuilder.group({
            area_code: [this.userData.telefone.dd, Validators.required],
            number: [this.userData.telefone.numero, Validators.required],
          }),
          address: this.formBuilder.group({
            street_name: ['rua carai', Validators.required],
            street_number: [123, Validators.required],
            zip_code: ['5700', Validators.required],
            // neighborhood: ['Bonfim', Validators.required],
            // city: ['Osasco', Validators.required],
            // federal_unit: ['SP', Validators.required],
          }),
        }),
      }),
    });

    this.cardForm.get('cardNumber').valueChanges.subscribe(cardnum => {
      // Pega os 6 primeiros numeros do cartao para identificacao do tipo de pagamento
      const bin = cardnum.replace(/[ .-]/g, '').slice(0, 6);

      if (bin.length >= 6) {
        // Pega o tipo do cartao (elo, hipercard, mastercard, visa)
        this.MERCADOPAGO.getPaymentMethod({
          'bin': bin,
        }, (status, response) => {
          if (status === 200) {
            // Seta o tipo de pagamento no forms para MP e back
            this.cardForm.get('paymentMethodId').setValue(response[0].id);
            this.paymentForm.get('payment_method_id').setValue(response[0].id);
          } else {
            // Cartao invalido / nao aceito
          }
        });

        // Pega as parcelas disponiveis para o cartao e total $
        this.MERCADOPAGO.getInstallments({
          'bin': bin,
          'amount': this.paymentData.valorTotal,
        }, (status, response) => {
          if (status === 200) {
            this.parcelas = response[0].payer_costs;
            this.paymentForm.get('issuer_id').setValue(response[0].issuer.id);
            console.log(response);
            console.log(this.paymentForm.value);
          }
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('paymentData' in changes && this.paymentForm) {
      // Set payment data in forms
      const data = changes.paymentData.currentValue;
      console.log(data);
      this.paymentForm.get('transaction_amount').setValue(data.valorTotal);
      this.paymentForm.get('description').setValue('Ingressos para ' + data.evento.nome);
      const items_array = this.paymentForm.get('additional_info').get('items');
      items_array.setValue(this.createItemData(data));
    }
  }

  // Cria objeto para form array
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

  // Executa todo o processo de pagamento, primeiro enviando os dados do cartao para o MP e depois pro back
  sendPaymentInfo(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      this.MERCADOPAGO.createToken(this.HTML_PAY_FORM.nativeElement, (status, response) => {
        if (status !== 200 && status !== 201) {
          alert('Algum erro nos dados do cartao!!');
        } else {
          // const card = document.createElement('input');
          // card.setAttribute('name', 'token');
          // card.setAttribute('type', 'hidden');
          // card.setAttribute('value', response.id);
          // this.paymentForm.nativeElement.appendChild(card);
          this.paymentForm.get('token').setValue(response.id);
          this.doSubmit = true;
          console.log(this.paymentForm.value);
          this.http.post(this.postLink, this.paymentForm.value, {headers: this.getHeaders()}).subscribe(succ => {
            console.log(succ);
          }, fail => console.log(fail));
          // this.paymentForm.nativeElement.submit();
        }
      });

      return false;
    }
  }

  getHeaders() {
    return new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept':       'application/json',
    });
  }

}
