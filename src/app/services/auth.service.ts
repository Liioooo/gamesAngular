import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserInfo, UserLoginInfo, UsernameAvailable} from '../interfaces/interfaces';
import {filter, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.http.post<UserLoginInfo>('/api/login.php', {username, password}).pipe(
                tap(data => resolve(data.error)),
                filter(data => data.auth === 'true')
            ).subscribe(data => {
                Object.keys(data).forEach(key => {
                    if(key !== 'error') {
                        sessionStorage.setItem(key, data[key]);
                    }
                });
                this.router.navigate(['dashboard']);
            });
        });
    }

    register(username: string, password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.http.post<UserLoginInfo>('/api/register.php', {username, password}).pipe(
                tap(data => resolve(data.error)),
                filter(data => data.auth === 'true')
            ).subscribe(data => {
                console.log(data);
                Object.keys(data).forEach(key => {
                    if(key !== 'error') {
                        sessionStorage.setItem(key, data[key]);
                    }
                });
                this.router.navigate(['dashboard']);
            });
        });
    }

    logout() {
        this.http.get('/api/logout.php').subscribe(data => this.setUserLoggedOut());
    }

    private setUserLoggedOut() {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('picturePath');
        this.router.navigate(['dashboard']);
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem('auth') === 'true';
    }

    getUsername(): string {
        return sessionStorage.getItem('username');
    }

    getUserID(): number {
        return Number(sessionStorage.getItem('userID'));
    }

    getProfilePicturePath(): string {
        return sessionStorage.getItem('picturePath');
    }

    updateProfilePicturePath() {
        sessionStorage.setItem('picturePath', sessionStorage.getItem('picturePath') + '?time=' + Date.now());
    }


    changeUsername(newUsername: string): Promise<string> {
        return new Promise<string>(resolve => {
            this.http.post('/api/editUser.php', {
                'newUsername': newUsername,
                'userID': sessionStorage.getItem('userID'),
                'action': 'changeUsername'
            }).subscribe(data => {
                if(data['auth'] === 'true') {
                    if(data['error'] !== 'alreadyExists') {
                        sessionStorage.setItem('username', data['username']);
                    }
                    resolve(data['error']);
                } else {
                    this.setUserLoggedOut();
                }
            });
        });
    }

    changePassword(newPassword: string, oldPassword: string): Promise<string> {
        return new Promise<string>(resolve => {
            this.http.post('/api/editUser.php', {
                'newPassword': newPassword,
                'oldPassword': oldPassword,
                'userID': sessionStorage.getItem('userID'),
                'action': 'changePassword'
            }).subscribe(data => {
                if(data['auth'] === 'true') {
                    resolve(data['error']);
                } else {
                    this.setUserLoggedOut();
                }
            });
        });
    }

    changePicture(file: any): Promise<string> {
        return new Promise<string>(resolve => {
            this.http.post('api/editUser.php', {
                'userID': sessionStorage.getItem('userID'),
                'action': 'changePicture',
                'file': file
            }).subscribe(data => {
                if(data['auth'] == 'true') {
                    if(data['error'] == '0') {
                        sessionStorage.setItem('picturePath', data['picture']);
                    }
                } else {
                    this.setUserLoggedOut();
                }
                resolve(data['error']);
            });
        });
    }

    removePicture() {
        if(this.getProfilePicturePath() !== '/pictures/default-profile-img.svg') {
            this.http.post('/api/deleteProfilePicture.php', {
                'userID': sessionStorage.getItem('userID')
            }).subscribe(data => {
                if(data['auth'] == 'true') {
                    if(data['error'] == '0') {
                        sessionStorage.setItem('picturePath', data['picture']);
                        this.updateProfilePicturePath();
                    }
                } else {
                    this.setUserLoggedOut();
                }
            });
        }
    }

    isUsernameAvailable(username: string) {
        return this.http.post<UsernameAvailable>('/api/isUserAvailable.php', {
            username: username
        });
    }

    getUserInfo(username: string): Observable<UserInfo> {
        return this.http.post<UserInfo>('/api/getUserInfo.php', {
            'username': username
        });
    }

    getUserDescription() {
        return this.http.post('/api/getUserDescription.php', {
            'userID':  sessionStorage.getItem('userID')
        });
    }

    updateUserDescription(description: string): Promise<string> {
        return new Promise(resolve => {
            this.http.post('/api/editUser.php', {
                'userID': sessionStorage.getItem('userID'),
                'action': 'changeDescription',
                'description': description
            }).pipe(
                tap(data => resolve('success')),
                filter(data => data['auth'] == false)
            ).subscribe(data => this.setUserLoggedOut());
        })
    }

}
