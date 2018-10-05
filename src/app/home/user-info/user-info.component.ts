import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo: any;

  constructor(private usuarioservice: UsuarioService, private authservice: AuthService) { }

  ngOnInit() {

    this.usuarioservice.getUsuarioEmail(this.authservice.ReturnEmail()).subscribe(res => {
      this.userInfo = res[0];
    });
  }

}
