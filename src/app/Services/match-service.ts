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
    const body = 'home=' + home + '&away=' + away + '&referee=' + referee + '&date=' + date;
    return this.http.post(`${environment.apiUrl}/match/create`, body/*, {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}*/);
  }

}
