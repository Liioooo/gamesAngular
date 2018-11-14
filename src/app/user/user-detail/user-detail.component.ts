import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
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

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private title: Title) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.username = params['username'];
          this.title.setTitle('LioGames - ' + this.username);
          this.auth.isUsernameAvailable(this.username).subscribe(userAva => {
              if(userAva['available'] == '0') {
                  this.userInfo = this.auth.getUserInfo(this.username);
              } else {
                  this.router.navigate(['noSuchUser']);
              }
          });
      });
  }
}
