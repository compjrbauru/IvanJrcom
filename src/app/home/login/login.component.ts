import { Component, OnInit } from '@angular/core';

import { enterLeave } from './../../@core/animations/animations';

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [enterLeave("cardanimation")]
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
