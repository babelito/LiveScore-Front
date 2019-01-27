import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
