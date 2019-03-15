import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../Models/user';
import { Match } from '../../Models/match';
import { MatchService } from '../../Services/match-service';
import { ContainerComponent } from '../ContainerComponent/container-component';

@Component({
  templateUrl: './tournament-component.html',
  styleUrls: ['./tournament-component.css']
})

export class TournamentComponent implements OnInit {
  currentUser: User;
  matches: Match[] = [];
  connected: boolean;
  tournament: string;

  constructor(
    private container: ContainerComponent,
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe(params => { this.tournament = params['id']; });
  }

  ngOnInit() {
    this.loadAllMatches();
    this.connected = this.container.connected;
  }

  goToAddMatch() {
    this.router.navigate(['/addMatch', this.tournament]);
  }

  private loadAllMatches() {
    this.matchService.getMatches(this.tournament).pipe(first()).subscribe(matches => {
      this.matches = matches;
    });
  }
}
