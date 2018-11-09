import {Component, Input, OnInit} from '@angular/core';
import {GetHighscoresReturn, ScoreService} from '../score.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  @Input() gameID: number;

  userlist: GetHighscoresReturn;

  constructor(private score: ScoreService, private router: Router) { }

  ngOnInit() {
    this.score.getHighscores(this.gameID)
        .subscribe(data => {
            this.userlist = data;
        });
  }

}
