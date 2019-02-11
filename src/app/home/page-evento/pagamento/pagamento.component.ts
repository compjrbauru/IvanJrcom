import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RouterHelper } from '../../../@core/utils/helpers/router-helper';
import { config } from './../../../config/config';
import { EventoService } from '../../../services/evento.service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  recaptchaKey = config.recaptcha.key;
  eventosAsync: Observable<any>;
  compra: any;
  userInfo: any;
  protected reCaptcha: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.userInfo = RouterHelper.getValues(this.route, 'userInfo');
    this.reCaptcha = this.fb.group({
      recaptcha: ['', Validators.required],
    });
    this.usuarioService.getItemCompra().subscribe(compra => {
      this.compra = compra;
    });
    this.eventosAsync = this.eventoService.getCarousel();
  }

}
