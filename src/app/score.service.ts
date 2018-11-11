import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


interface HighscoreSaveReturn {
    userHighscore: string,
    allHighscore: string,
}

interface GetHighscoreReturn {
    allHighscore: string
}

export interface GetHighscoresGameReturn {
    [index: number]: {
        username: string,
        score: number
    }
}

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    constructor(private auth: AuthService, private http: HttpClient) { }

    saveHighscore(gameID: number, score: number): Observable<HighscoreSaveReturn> {
      return this.http.post<HighscoreSaveReturn>('/api/saveHighscore.php', {
          'userID': this.auth.getUserID(),
          'gameID': gameID,
          'score': score
        });
    }

    getHighScore(gameID: number): Observable<GetHighscoreReturn> {
      return this.http.post<GetHighscoreReturn>('/api/getHighscore.php', {
        'gameID': gameID
      });
    }

    getHighscoresGame(gameID: number): Observable<GetHighscoresGameReturn> {
        return this.http.post<GetHighscoresGameReturn>('/api/getHighscoresGame.php', {
            'gameID': gameID
        });
    }

}
