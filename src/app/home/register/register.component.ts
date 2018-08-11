import { Component, OnInit } from '@angular/core';

import { enterLeave } from '../../@core/animations/animations';

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [enterLeave("cardanimations")]
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
