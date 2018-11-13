import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NavbarCollapsedService} from '../services/navbar-collapsed.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public location: Location, public auth: AuthService, private router: Router, public collapsed: NavbarCollapsedService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.collapsed.isCollapsed = true;
    });
  }

}
