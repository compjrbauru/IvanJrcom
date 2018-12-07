import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { buttonVerified } from '../../../@core/animations/animations';
import { RouterHelper } from '../../../@core/utils/helpers/router-helper';
import { NotificacaoService } from '../../../services/notificacao.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from './../../../services/auth.service';

@Component({
    selector: 'ngx-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    animations: [buttonVerified('buttonregister')],
})
export class UserEditComponent implements OnInit {
    form: any = {};
    ResolvedUser: any;
    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private notificacao: NotificacaoService,
        private activatedRoute: ActivatedRoute,
    ) {

    }


    ngOnInit() {
        this.ResolvedUser = RouterHelper.getValues(this.activatedRoute, 'userInfo');
    }


    submit() {
        this.usuarioService.patchUsuario(this.form['formEvent'].value, this.ResolvedUser.id);
        this.authService.setLocal({ ...this.form['formEvent'].value, ...this.ResolvedUser.id });
        this.notificacao.ngxtoaster('Dados edidatos com sucesso!', '', true);
    }
}
