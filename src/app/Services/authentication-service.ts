import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.router.url === '/login' && localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
      return false;
    } else if (this.router.url === '/addMatch' && !localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
