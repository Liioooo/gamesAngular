import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../interfaces/interfaces';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: string;
  userInfo: Observable<UserInfo>;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private title: Title) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.username = params['username'];
          this.title.setTitle('LioGames - ' + this.username);
          this.api.isUsernameAvailable(this.username).subscribe(userAva => {
              if(userAva['available'] == '0') {
                  this.userInfo = this.api.getUserInfo(this.username);
              } else {
                  this.router.navigate(['noSuchUser']);
              }
          });
      });
  }
}
