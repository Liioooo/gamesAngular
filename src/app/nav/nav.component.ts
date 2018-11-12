import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NavbarCollapsedService} from '../navbar-collapsed.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(public location: Location, public auth: AuthService, private router: Router, public collapsed: NavbarCollapsedService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }

}
