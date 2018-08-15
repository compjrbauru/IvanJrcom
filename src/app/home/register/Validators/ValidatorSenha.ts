import {AbstractControl} from '@angular/forms';

export class ValidatorSenha {

    static MesmaSenha(abstractControl: AbstractControl) {
        const senha = abstractControl.get('Senha').value;
        const validarSenha = abstractControl.get('ConfirmarSenha').value;
        if (senha !== validarSenha) {
            abstractControl.get('ConfirmarSenha').setErrors({ MesmaSenha: true });
        } else {
            abstractControl.get('ConfirmarSenha').setErrors(null);
        }
    }

}
