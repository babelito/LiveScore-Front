import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../Models/user';
import { Match } from '../../Models/match';
import { MatchService } from '../../Services/match-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login-service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: './addmatch-component.html',
  styleUrls: ['./addmatch-component.css']
})

export class AddMatchComponent implements OnInit {
  matches: Match[] = [];
  addMatchForm: FormGroup;
  teams: [];
  referees: [];
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMatchForm = this.formBuilder.group({
      home: ['', Validators.required],
      away: ['', Validators.required],
      referee: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.loadInfo();
  }

  get f() { return this.addMatchForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.addMatchForm.invalid) {
      return;
    }

    this.loading = true;
    this.createMatch();
  }

  private loadInfo() {
    this.matchService.getInfos().pipe(first()).subscribe((info: {teams: [], referees: []}) => {
      this.teams = info.teams;
      this.referees = info.referees;
    });
  }

  private createMatch() {
    this.matchService.createMatch(/*{home: '1', away: '2', referee: '1', date: '2019-01-29'}*/ '1', '2', '1', '2019-01-30');
  }
}
