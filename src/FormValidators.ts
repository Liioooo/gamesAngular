import {AbstractControl} from '@angular/forms';

export class FormValidators {

    public static samePasswords(c: AbstractControl) {
        const p1 = c.get('password').value;
        const p2 = c.get('password1').value;
        if(p1 !== p2) {
            c.get('password1').setErrors({matchPassword: true});
        } else {
            return null;
        }
    }

}