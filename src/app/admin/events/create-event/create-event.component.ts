import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  formEvent: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formEvent = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      ingressos: this.formBuilder.group({
        lote: this.formBuilder.group({
          disponiveis: ['', Validators.required],
          numero: ['1'],
        }),
        feminino: this.formBuilder.group({
          disponiveis: [],
          valor: []
        }),
        masculino: this.formBuilder.group({
          disponiveis: [],
          valor: [],
        }),
        unisex: this.formBuilder.group({
          disponiveis: [],
          valor: [],
        }),
      }),
      url: [null],
      id: ['', Validators.required],
    });
  }

  submit(form){ }
  ngOnInit() { }

}
