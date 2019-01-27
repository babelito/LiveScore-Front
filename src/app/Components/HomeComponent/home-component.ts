import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../Models/user';
import { Match } from '../../Models/match';
import { MatchService } from '../../Services/match-service';
import { LoginService } from '../../Services/login-service';

@Component({
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  matches: Match[] = [];
  connected: boolean;

  constructor(
    private matchService: MatchService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  }

  ngOnInit() {
    this.loadAllMatches();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  private loadAllMatches() {
    this.matchService.getMatches().pipe(first()).subscribe(matches => {
      this.matches = matches;
    });
  }
}
