import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, UserInfoReturn} from '../auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: string;
  userInfo: UserInfoReturn;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.username = params['username'];
          this.auth.isUsernameAvailable(this.username).subscribe(userAva => {
              if(userAva['available'] == '0') {
                  this.auth.getUserInfo(this.username).subscribe(data => {
                      this.userInfo = data;
                  }) ;
              } else {
                  this.router.navigate(['noSuchUser']);
              }
          });
      });
  }

}
