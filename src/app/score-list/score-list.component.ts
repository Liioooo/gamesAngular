import {Component, Input, OnInit} from '@angular/core';
import {GetHighscoresGameReturn, ScoreService} from '../score.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  @Input() gameID: number;

  userlist: Observable<GetHighscoresGameReturn>;

  constructor(private score: ScoreService) { }

  ngOnInit() {
    this.userlist = this.score.getHighscoresGame(this.gameID);
  }

}
