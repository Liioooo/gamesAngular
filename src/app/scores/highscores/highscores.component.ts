import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
      this.title.setTitle('LioGames - Highscores');
  }

}
