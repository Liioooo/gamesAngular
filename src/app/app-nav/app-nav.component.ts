import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(public location: Location) { }

  ngOnInit() {
  }

}
