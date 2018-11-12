import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

export interface UsernameAvailableInterface {
    available: string
}

export interface UserInfoReturn {
    highscores: {
        [index: number]: {
            gameName: string,
            score: number
        }
    },
    profilePicture: string,
    description: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.http.post('/api/login.php', {username, password})
                .subscribe(data => {
                    if (data['auth'] == 1) {
                        sessionStorage.setItem('authenticated', 'true');
                        sessionStorage.setItem('username', data['username']);
                        sessionStorage.setItem('userID', data['userID']);
                        sessionStorage.setItem('picturePath', data['picture']);
                        this.router.navigate(['dashboard']);
                    }
                    resolve(data['error']);
                });
        });
    }

    register(username: string, password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.http.post('/api/register.php', {username, password})
                .subscribe(data => {
                    if(data['auth'] == 1) {
                        sessionStorage.setItem('authenticated', 'true');
                        sessionStorage.setItem('username', data['username']);
                        sessionStorage.setItem('userID',  data['userID']);
                        sessionStorage.setItem('picturePath', data['picture']);
                        this.router.navigate(['dashboard']);
                    }
                    resolve(data['error']);
                });
        });
    }

    logout() {
        this.http.get('/api/logout.php')
            .subscribe(data => {
                this.setUserLoggedOut();
            });
    }

    private setUserLoggedOut() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('picturePath');
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
                if(data['auth'] == 1) {
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
                if(data['auth'] == 1) {
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
                if(data['auth'] == 1) {
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
                if(data['auth'] == 1) {
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
        return this.http.post<UsernameAvailableInterface>('/api/isUserAvailable.php', {
            username: username
        });
    }

    getUserInfo(username: string): Observable<UserInfoReturn> {
        return this.http.post<UserInfoReturn>('/api/getUserInfo.php', {
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
            }).subscribe(data => {
                if (data['auth'] == 0) {
                    this.setUserLoggedOut();
                }
                resolve('success');
            });
        })
    }

}
