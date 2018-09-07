import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-form-ingressos',
  templateUrl: './form-ingressos.component.html',
  styleUrls: ['./form-ingressos.component.scss']
})
export class FormIngressosComponent implements OnInit {
  
  @Input()
  categorias: Observable<any>;
  @Input()
  formReset: boolean;
  @Input()
  resolvedIngresso: any = null;
  @Output()
  formEmitter = new EventEmitter<any>();
  formIngressos: FormGroup = null;

  constructor() { }

  ngOnInit() {
  }

}
