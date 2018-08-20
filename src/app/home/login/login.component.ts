import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { enterComponent } from '../../@core/animations/animations';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [enterComponent('cardanimation')],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  resetPass() {}

  loginFacebook() {}

  submit(form: any) {}
}
