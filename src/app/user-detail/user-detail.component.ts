import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.username = params['username'];
      });
  }

}
