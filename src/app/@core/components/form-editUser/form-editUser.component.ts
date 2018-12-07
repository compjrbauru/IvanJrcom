import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-form-edituser',
    templateUrl: './form-editUser.component.html',
    styleUrls: ['./form-editUser.component.scss'],
})
export class FormEditUserComponent implements OnInit {
    public formEvent: FormGroup;
    @Output() formEmitter = new EventEmitter<any>();
    @Input() resolvedUser: any = null;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        const RGvalidator: ValidatorFn = (form: AbstractControl) => {
            const error = {
                RGvalidator: 'O número de RG não é valido',
            };
            return (form.get('RG').value.length < 9 && !form.get('RG').untouched) ? error : null;
        };
        const CPFvalidator: ValidatorFn = (form: AbstractControl) => {
            const error = {
                CPFvalidator: 'O número de CPF não é valido',
            };
            return (form.get('CPF').value.length < 11 && !form.get('CPF').untouched) ? error : null;
        };
        this.formEvent = this.formBuilder.group(
            {
                registroCompleto: [true, Validators.required],
                nome: ['', Validators.required],
                sobrenome: ['', Validators.required],
                CPF: ['', Validators.required],
                RG: ['', Validators.required],
                telefone: this.formBuilder.group({
                    dd: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            Validators.maxLength(2),
                        ],
                    ],
                    numero: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.maxLength(9),
                        ],
                    ],
                }),
                nascimento: ['', Validators.required],
                email: ['', [Validators.email, Validators.required]],
                Cidade: ['', Validators.required],
                Estado: ['', Validators.required],
            },
            { validator: [RGvalidator, CPFvalidator] },
        );
        this.patchValues(this.resolvedUser);
        this.formEmitter.emit(this.formEvent);
    }

    onFormValueChanges() {
        this.formEvent.valueChanges.subscribe(() => {
            this.formEmitter.emit(this.formEvent);
        });
    }


    patchValues(resolvedUser: any = []) {
        this.formEvent.patchValue({
            ...resolvedUser,
        });
    }
}

