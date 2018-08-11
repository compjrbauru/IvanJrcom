import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form_login: any;
  constructor(private formBuilder: FormBuilder) {
  this.form_login = this.formBuilder.group({
    login: ['',Validators.required],
    password: ['',Validators.required],
  });
   }
  ngOnInit() {
  }

}
