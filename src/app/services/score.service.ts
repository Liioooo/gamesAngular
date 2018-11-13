import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetHighscore, GetHighscoresForGame, HighscoreSave} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    constructor(private auth: AuthService, private http: HttpClient) { }

    saveHighscore(gameID: number, score: number): Observable<HighscoreSave> {
      return this.http.post<HighscoreSave>('/api/saveHighscore.php', {
          'userID': this.auth.getUserID(),
          'gameID': gameID,
          'score': score
        });
    }

    getHighScore(gameID: number): Observable<GetHighscore> {
      return this.http.post<GetHighscore>('/api/getHighscore.php', {
        'gameID': gameID
      });
    }

    getHighscoresGame(gameID: number): Observable<GetHighscoresForGame> {
        return this.http.post<GetHighscoresForGame>('/api/getHighscoresGame.php', {
            'gameID': gameID
        });
    }

}
