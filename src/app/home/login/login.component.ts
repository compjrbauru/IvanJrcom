import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form_login: FormGroup;
  constructor(private formBuilder: FormBuilder) {
   }
  ngOnInit() {
    this.form_login = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });
  }
}
