import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public lastError: string;
    public changedUserSuccess: boolean = false;
    public changedPassSuccess: boolean = false;

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        return this.http.post('/api/login.php', {username, password})
            .subscribe(data => {
                if(data['auth'] == 1) {
                    sessionStorage.setItem('authenticated', 'true');
                    sessionStorage.setItem('username', data['username']);
                    sessionStorage.setItem('userID',  data['userID']);
                    this.router.navigate(['dashboard']);
                }
                this.lastError = data['error'];
            });
    }

    register(username: string, password: string) {
        this.http.post('/api/register.php', {username, password})
            .subscribe(data => {
                if(data['auth'] == 1) {
                    sessionStorage.setItem('authenticated', 'true');
                    sessionStorage.setItem('username', data['username']);
                    sessionStorage.setItem('userID',  data['userID']);
                    this.router.navigate(['dashboard']);
                }
                this.lastError = data['error'];
            });
    }

    logout() {
        this.http.get('/api/logout.php')
            .subscribe(data => {
                this.lastError = data['error'];
                this.setUserLoggedOut();
            });
    }

    private setUserLoggedOut() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('authenticated');
        this.router.navigate(['dashboard']);
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem('authenticated') === 'true';
    }

    getUsername(): string {
        return sessionStorage.getItem('username');
    }

    getUserID(): number {
        return Number(sessionStorage.getItem('userID'));
    }


    changeUsername(newUsername: string) {
        this.http.post('/api/editUser.php', {
            'newUsername': newUsername,
            'userID': sessionStorage.getItem('userID'),
            'action': 'changeUsername'
        })
            .subscribe(data => {
                if(data['auth'] == 1) {
                    if(data['error'] !== '23000') {
                        sessionStorage.setItem('username', data['username']);
                        this.changedUserSuccess = true;
                    } else {
                        this.changedUserSuccess = false;
                    }
                } else {
                    this.setUserLoggedOut();
                }
                this.lastError = data['error'];
            });
    }

    changePassword(newPassword: string, oldPassword: string) {
        this.http.post('/api/editUser.php', {
            'newPassword': newPassword,
            'oldPassword': oldPassword,
            'userID': sessionStorage.getItem('userID'),
            'action': 'changePassword'
        })
            .subscribe(data => {
                if(data['auth'] == 1) {
                    if(data['error'] == 0) {
                        this.changedPassSuccess = true;
                    } else {
                        this.changedPassSuccess = false;
                    }
                } else {
                    this.setUserLoggedOut();
                }
                this.lastError = data['error'];
            });
    }

}
