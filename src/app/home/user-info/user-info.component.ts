import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterHelper } from './../../@core/utils/helpers/router-helper';
import { CompraService } from './../../services/compra.service';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo: any;
  comprasAsync: any;

  constructor(
    private route: ActivatedRoute,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    this.userInfo = RouterHelper.getValues(this.route, 'userInfo');
    this.comprasAsync = this.compraService.getComprasId(this.userInfo.id);
  }

}
