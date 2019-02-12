import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../Services/login-service';

@Component({
  selector: 'app-container',
  templateUrl: './container-component.html',
  styleUrls: ['./container-component.css']
})

export class ContainerComponent {
  private _connected: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    if (localStorage.getItem('currentUser')) {
      this._connected = true;
    } else {
      this._connected = false;
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.loginService.logout();
    this._connected = false;
  }

  get connected(): boolean {
    return this._connected;
  }

  set connected(value: boolean) {
    this._connected = value;
  }
}
