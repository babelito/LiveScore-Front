import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';


import { Match } from '../Models/match';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches() {
    return this.http.get<Match[]>(`${environment.apiUrl}/match/all`);
  }

  getInfos() {
    return this.http.get(`${environment.apiUrl}/match/info`);
  }

  createMatch(home, away, referee, date) {
    const body = new HttpParams()
      .set('home', '1')
      .set('away', '2')
      .set('referee', '1')
      .set('date', '2019-01-01');

    return this.http.post(`${environment.apiUrl}/match/create`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

}
