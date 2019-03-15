import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { Match } from '../Models/match';
import { Tournament } from '../Models/tournament';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches(tournament: string) {
    return this.http.get<Match[]>(`${environment.apiUrl}/match/matches/` + tournament);
  }

  getInfo() {
    return this.http.get(`${environment.apiUrl}/match/info`);
  }

  createMatch(match: Match) {
    return this.http.post<Match>(`${environment.apiUrl}/match/create`, match);
  }

  getTournaments() {
    return this.http.get<Tournament[]>(`${environment.apiUrl}/match/tournaments`);
  }

}
