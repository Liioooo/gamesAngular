import { FormControl, ValidationErrors} from '@angular/forms';
import {AuthService} from './auth.service';

export class PasswordValidator {

    public static samePasswords(c: FormControl) {
        const p1 = c.get('password').value;
        const p2 = c.get('password1').value;
        if (p1 !== p2) {
            c.get('password1').setErrors({matchPassword: true});
        } else {
            return null;
        }
    }
}

export class UsernameValidator {

    static authService: AuthService;

    constructor(private auth: AuthService) {
        UsernameValidator.authService = auth;
    }

     usernameAvailable(c: FormControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            UsernameValidator.authService.isUsernameAvailable(c.value).subscribe(data => {
                if(data.available == '1') {
                    resolve(null);
                } else {
                    resolve({isAvailable: true});
                }
            });
        });
    }

}