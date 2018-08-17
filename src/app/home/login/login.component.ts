import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { enterComponent } from '../../@core/animations/animations';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [enterComponent('cardanimation')],
})
export class LoginComponent implements OnInit {
  form_login: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.form_login = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
