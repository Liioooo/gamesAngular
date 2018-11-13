import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarCollapsedService {

  private isCollapsedVar = true;

  constructor() { }

  toggle() {
    this.isCollapsedVar = !this.isCollapsed;
  }

  get isCollapsed() { return this.isCollapsedVar;}

  set isCollapsed(isCollapsed: boolean) {this.isCollapsedVar = isCollapsed;}
}
