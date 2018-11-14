import {Component, Input, OnInit} from '@angular/core';
import {ScoreService} from '../../services/score.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GetHighscoresForGame} from '../../interfaces/interfaces';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  @Input() gameID: number;

  userlist: Observable<GetHighscoresForGame>;

  constructor(private score: ScoreService) { }

  ngOnInit() {
    this.userlist = this.score.getHighscoresGame(this.gameID);
  }

}
