import { FormControl, ValidationErrors} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Observable, Observer, of} from 'rxjs';

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

export class FileValidator {

    public static fileValid(c: FormControl) {
        const file = c.value.toString().toLowerCase();
        if((file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif'))) {
            return null;
        } else {
            return {invaldFile: true};
        }
    }
}

export class UsernameValidator {

    static authService: AuthService;

    constructor(private auth: AuthService) {
        UsernameValidator.authService = auth;
    }

     usernameAvailable(c: FormControl): Observable<ValidationErrors | null> {
        return Observable.create((observer: Observer<ValidationErrors>) => {
            UsernameValidator.authService.isUsernameAvailable(c.value).subscribe(data => {
                if (data.available == '1') {
                    observer.next(null);
                } else {
                    observer.next({isNotAvailable: true});
                }
                observer.complete();
            });
        });
    }

}