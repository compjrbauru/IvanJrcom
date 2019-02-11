import { MercadoPagoBase } from './../mercado-pago-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'ngx-mercadopago-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss'],
})
export class CartaoComponent extends MercadoPagoBase implements OnInit {
  @ViewChild('payForm') HTML_PAY_FORM;
  cardForm: FormGroup;
  parcelas; // Informações das parcelas para ser mostrado no select

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    super();
    this.MERCADOPAGO.getIdentificationTypes();

    // Form para ser usado com o SDK do mercado livre para gerar um token do cartao de uso único
    this.cardForm = this.formBuilder.group({
      // Change hardcoded strings to null
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
        email: [, Validators.required],
      }),
      token: [, Validators.required],
      issuer_id: [],
      installments: [, Validators.required],
      payment_method_id: [, Validators.required],
      transaction_amount: [, Validators.required],
      description: [, Validators.required],
      statement_descriptor: ['LemonParty eventos', Validators.required],
      additional_info: this.formBuilder.group({
        items: [, Validators.required],
        payer: this.formBuilder.group({
          first_name: [, Validators.required],
          last_name: [, Validators.required],
          phone: this.formBuilder.group({
            area_code: [, Validators.required],
            number: [, Validators.required],
          }),
          address: this.formBuilder.group({
            street_name: [, Validators.required],
            street_number: [, Validators.required],
            zip_code: [, Validators.required],
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
            // Cartao invalido / nao aceito - avisa o erro pro usuario
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
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.paymentForm.get('payer').get('email').setValue('TEST@GMAIL.COM');
    const payer = this.paymentForm.get('additional_info').get('payer');
    payer.get('first_name').setValue(this.userData.nome);
    payer.get('last_name').setValue(this.userData.sobrenome);
    const address = payer.get('address');
    address.get('street_name').setValue('rua Paulo augusto Fonseca');
    address.get('street_number').setValue(123);
    address.get('zip_code').setValue('17012636');
    // address.get('neighborhood').setValue(this.userData);
    // address.get('city').setValue(this.userData.Cidade);
    // address.get('federal_unit').setValue(this.userData.Estado);
    const phone = payer.get('phone');
    phone.get('area_code').setValue(this.userData.telefone.dd);
    phone.get('number').setValue(this.userData.telefone.numero);
  }

  // Executa todo o processo de pagamento, primeiro enviando os dados do cartao para o MP e depois pro back
  sendPaymentInfo(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      this.MERCADOPAGO.createToken(this.HTML_PAY_FORM.nativeElement, (status, response) => {
        if (status !== 200 && status !== 201) {
          alert('Algum erro nos dados do cartao!!');
          // Notificar usuario do erro
        } else {
          this.paymentForm.get('token').setValue(response.id);
          this.doSubmit = true;
          this.http.post(this.postLink, this.paymentForm.value, {headers: this.getHeaders()}).subscribe(succ => {
            // Redirecionar para tela compra efetuada e estado de pagamento
            console.log(succ);
          }, fail => {
            // Redirecionar para tela de erro
            console.log(fail);
          });
        }
      });

      return false;
    }
  }
}
