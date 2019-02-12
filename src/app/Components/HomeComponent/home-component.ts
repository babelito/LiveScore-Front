import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../Models/user';
import { Match } from '../../Models/match';
import { MatchService } from '../../Services/match-service';
import { ContainerComponent } from '../ContainerComponent/container-component';

@Component({
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  matches: Match[] = [];
  connected: boolean;

  constructor(
    private container: ContainerComponent,
    private matchService: MatchService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllMatches();
    this.connected = this.container.connected;
  }

  goToAddMatch() {
    this.router.navigate(['/addMatch']);
  }

  private loadAllMatches() {
    this.matchService.getMatches().pipe(first()).subscribe(matches => {
      this.matches = matches;
    });
  }
}
