import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  
  constructor() { }

  ngOnInit() {
  }

}
