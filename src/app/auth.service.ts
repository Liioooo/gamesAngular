import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('/api/login.php', {username, password})
        .subscribe(data => {
          console.log(data, 'answer');
        });
  }

  getUsername(): string {
    return "";
  }
}
