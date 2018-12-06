import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterHelper } from './../../@core/utils/helpers/router-helper';
import { AuthService } from './../../services/auth.service';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo: any;

  constructor(
    private usuarioservice: UsuarioService,
    private authservice: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userInfo = RouterHelper.getValues(this.route, 'userInfo');
  }

}
