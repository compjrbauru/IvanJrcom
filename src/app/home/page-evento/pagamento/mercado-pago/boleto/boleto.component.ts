import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MercadoPagoBase } from '../mercado-pago-base';
@Component({
  selector: 'ngx-boleto-mercadopago',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss'],
})
export class BoletoComponent extends MercadoPagoBase implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    super();

    // Iniciando Forms no constructor para estar disponivel no ngonchanges
    this.paymentForm = this.formBuilder.group({
      payer: this.formBuilder.group({
        email: [, Validators.required],
        first_name: [, Validators.required],
        last_name: [, Validators.required],
        address: this.formBuilder.group({
          street_name: [, Validators.required],
          street_number: [, Validators.required],
          zip_code: [, Validators.required],
          neighborhood: [, Validators.required],
          city: [, Validators.required],
          federal_unit: [, Validators.required],
        }),
        identification: this.formBuilder.group({
          type: ['CPF', Validators.required],
          number: [, Validators.required],
        }),
      }),
      payment_method_id: ['bolbradesco', Validators.required],
      transaction_amount: [, Validators.required],
      description: [, Validators.required],
      statement_descriptor: ['LemonParty eventos', Validators.required],
      additional_info: this.formBuilder.group({
        items: [, Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    const payer = this.paymentForm.get('payer');
    payer.get('email').setValue('TEST@GMAIL.COM');
    payer.get('first_name').setValue(this.userData.nome);
    payer.get('last_name').setValue(this.userData.sobrenome);
    payer.get('identification').get('number').setValue(this.userData.CPF);
    const address = payer.get('address');
    // CHange hardcoded strings to userdata fields whenever they are available
    address.get('street_name').setValue('rua Paulo Augusto Fonseca');
    address.get('street_number').setValue(123);
    address.get('zip_code').setValue('17012636');
    address.get('neighborhood').setValue('Ipanema');
    address.get('city').setValue(this.userData.Cidade);
    address.get('federal_unit').setValue(this.userData.Estado);
  }

  doPayment() {
    if (!this.doSubmit) {
      this.doSubmit = true;
      this.http.post(this.postLink, this.paymentForm.value, {headers: this.getHeaders()}).subscribe(success => {
        console.log(success);
        // Redirecionar para pagina de sucesso de Compra onde será gerado o boleto
      }, fail => {
        // Redirecionar para pagina de erro
        console.log(fail);
      });
    }
  }
}
