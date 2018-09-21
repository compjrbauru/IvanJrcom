import {AbstractControl} from '@angular/forms';

export class ValidatorNumMin {

    static DigitosRestantes (abstractControl: AbstractControl) {
        const rg = abstractControl.get('RG').value;
        const cpf = abstractControl.get('CPF').value;
        if (rg.length < 9 && !abstractControl.get('RG').untouched)
            abstractControl.get('RG').setErrors({ DigitosRestantes: true });
        if (cpf.length < 11 && !abstractControl.get('CPF').untouched)
            abstractControl.get('CPF').setErrors({ DigitosRestantes: true });
    }
}
