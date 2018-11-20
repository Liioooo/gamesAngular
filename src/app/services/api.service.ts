import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {GetHighscore, GetHighscoresForGame, HighscoreSave, UserInfo, UserLoginInfo, UsernameAvailable} from '../interfaces/interfaces';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private router: Router) { }

    sendRequest<T>(action: string, params: object): Observable<T> {
        return this.http.post<T>('/api/index.php', {
            'action': action,
            'params': params
        }).pipe(
            tap(data => {
                if(data['status'] != '200') {
                    console.log(data['status'], data['message']);
                    if(data['status'] === '106') {
                        this.setUserLoggedOut();
                    }
                }
            }),
            filter(data => data['status'] == '200'),
            map(data => data['result'])
        );
    }

    login(username: string, password: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.sendRequest<UserLoginInfo>('login', {
                'username': username,
                'password': password
            }).pipe(
                tap(data => observer.next(data.error)),
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

    register(username: string, password: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.sendRequest<UserLoginInfo>('register', {
                'username': username,
                'password': password
            }).pipe(
                tap(data => observer.next(data.error)),
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

    deleteUserAccount(password: string): Observable<string> {
        return this.sendRequest('deleteUserAccount', {
            'password': password
        }).pipe(
            map(data => data['error']),
            tap(data => {
                if(data == '') {
                    this.setUserLoggedOut();
                }
            })
        );
    }


    logout() {
        this.sendRequest('logout', {}).subscribe(data => this.setUserLoggedOut());
    }

    private setUserLoggedOut() {
        sessionStorage.clear();
        this.router.navigate(['dashboard']);
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem('auth') === 'true';
    }

    getUsername(): string {
        return sessionStorage.getItem('username');
    }

    getProfilePicturePath(): string {
        return sessionStorage.getItem('picturePath');
    }

    updateProfilePicturePath() {
        sessionStorage.setItem('picturePath', sessionStorage.getItem('picturePath') + '?time=' + Date.now());
    }

    changeUsername(newUsername: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.sendRequest('changeUsername', {
                'newUsername': newUsername
            }).subscribe(data => {
                if(data['error'] !== 'alreadyExists') {
                    sessionStorage.setItem('username', data['username']);
                }
                observer.next(data['error']);
            });
        });
    }

    changePassword(newPassword: string, oldPassword: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.sendRequest('changePassword', {
                'newPassword': newPassword,
                'oldPassword': oldPassword,
            }).subscribe(data => observer.next(data['error']));
        });
    }

    changePicture(file: any): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.sendRequest('changePicture', {
                'file': file
            }).subscribe(data => {
                if(data['error'] == '') {
                    sessionStorage.setItem('picturePath', data['picture']);
                }
                observer.next(data['error']);
            });
        });
    }

    removePicture() {
        if(this.getProfilePicturePath() !== '/pictures/default-profile-img.svg') {
            this.sendRequest('deleteProfilePicture', {})
                .subscribe(data => {
                    sessionStorage.setItem('picturePath', data['picturePath']);
                    this.updateProfilePicturePath();
            });
        }
    }

    isUsernameAvailable(username: string) {
        return this.sendRequest<UsernameAvailable>('isUserAvailable', {
            'username': username
        });
    }

    getUserInfo(username: string): Observable<UserInfo> {
        return this.sendRequest<UserInfo>("getUserInfo", {
            'username': username
        });
    }

    getUserDescription() {
        return this.sendRequest('getUserDescription', {});
    }

    updateUserDescription(description: string): Observable<string> {
        return this.sendRequest('changeDescription', {
            'newDescription': description
        }).pipe(
            filter(data => data['error'] == ''),
            map(data => data['error'])
        );
    }

    getHighscoresGame(gameID: number): Observable<GetHighscoresForGame> {
        return this.sendRequest<GetHighscoresForGame>('getHighscoresGame', {
            'gameID': gameID
        }).pipe(
            map(data => data['scores'])
        );
    }

    saveHighscore(gameID: number, score: number): Observable<HighscoreSave> {
        return this.sendRequest<HighscoreSave>('saveHighscore', {
            'gameID': gameID,
            'score': score
        });
    }

    getHighScore(gameID: number): Observable<GetHighscore> {
        return this.sendRequest<GetHighscore>('getHighscore', {
            'gameID': gameID
        });
    }

}
