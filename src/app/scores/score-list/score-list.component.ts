import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GetHighscoresForGame} from '../../interfaces/interfaces';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  @Input() gameID: number;

  userlist: Observable<GetHighscoresForGame>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.userlist = this.api.getHighscoresGame(this.gameID);
  }

}
