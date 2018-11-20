import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-cookie-notice',
    templateUrl: './cookie-notice.component.html',
    styleUrls: ['./cookie-notice.component.css'],
    animations: [
        trigger('cookieAnimation', [
            state('in', style({
                'opacity': '1', 'visibility': 'visible'
            })),
            state('out', style({
                'opacity': '0', 'visibility': 'hidden'
            })),
            transition('in => out', [group([
                    animate('1500ms ease-in-out', style({
                        'opacity': '0'
                    })),
                    animate('1000ms ease-in-out', style({
                        'bottom': '-55px'
                    })),
                    animate('1000ms ease-in-out', style({
                        'visibility': 'hidden'
                    }))
                ]
            )])
        ])
    ]
})
export class CookieNoticeComponent implements OnInit {

  public animationState: string = 'in';

  constructor(private cookies: CookieService) { }

  ngOnInit() {
    if(this.cookies.check('acceptedCookies')) {
      this.animationState = 'out';
    }
  }

  acceptCookies() {
      let expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7 );
      this.cookies.set('acceptedCookies', 'true', expiredDate);
      this.animationState = this.animationState === 'in' ? 'out' : 'in';
  }

}
