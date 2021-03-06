import {FormControl, ValidationErrors} from '@angular/forms';
import {ApiService} from '../services/api.service';
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
        }
        return {invalidFile: true};
    }

    public static required(c: FormControl) {
        if(c.value === '') {
            return {required: true};
        }
        return null;
    }
}

export class UsernameValidator {

    static apiService: ApiService;

    constructor(private api: ApiService) {
        UsernameValidator.apiService = api;
    }

     usernameAvailable(c: FormControl): Observable<ValidationErrors | null> {
        return Observable.create((observer: Observer<ValidationErrors>) => {
            UsernameValidator.apiService.isUsernameAvailable(c.value).subscribe(data => {
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