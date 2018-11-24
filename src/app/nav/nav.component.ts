import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private collapsed: boolean = true;

  constructor(public location: Location, public api: ApiService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.collapsed = true;
    });
  }

}
