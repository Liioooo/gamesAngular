import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public username: string;
    public userId: number;
    public lastError: string;
    public authenticated: boolean = false;

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        return this.http.post('/api/login.php', {username, password})
            .subscribe(data => {
                if(data['auth'] == 1) {
                    this.authenticated = true;
                    this.username = data['username'];
                    this.userId = data['userId'];
                    this.router.navigate(['dashboard']);
                }
                this.lastError = data['error'];
            });
    }

    register(username: string, password: string) {
        this.http.post('/api/register.php', {username, password})
            .subscribe(data => {
                if(data['auth'] == 1) {
                    this.authenticated = true;
                    this.username = data['username'];
                    this.userId = data['userId'];
                    this.router.navigate(['dashboard']);
                }
                this.lastError = data['error'];
            });
    }

}
