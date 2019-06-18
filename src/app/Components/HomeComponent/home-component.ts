import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../Models/user';
import { Tournament } from '../../Models/tournament';
import { MatchService } from '../../Services/match-service';
import {ContainerComponent} from "../ContainerComponent/container-component";

@Component({
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  tournaments: Tournament[] = [];
  connected: boolean;

  constructor(
    private matchService: MatchService,
    private container: ContainerComponent,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllTournaments();
    this.connected = this.container.connected;
  }

  private loadAllTournaments() {
    this.matchService.getTournaments().pipe(first()).subscribe(tournaments => {
      this.tournaments = tournaments;
    });
  }

  goToTournament(tournament: string) {
    this.router.navigate(['/tournament', tournament]);
  }

  goToAddTournament() {
    this.router.navigate(['/addTournament']);
  }
}
