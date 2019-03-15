import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

import { MatchService } from '../../Services/match-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  templateUrl: './addmatch-component.html',
  styleUrls: ['./addmatch-component.css']
})

export class AddMatchComponent implements OnInit {
  addMatchForm: FormGroup;
  teams: [string];
  referees: [string];
  submitted = false;
  loading = false;
  connected: boolean;
  tournament: string;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => { this.tournament = params['id']; });
  }

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
      console.log(this.findInvalidControls());
      return;
    }

    this.loading = true;
    this.createMatch();
  }

  private loadInfo() {
    this.matchService.getInfo().pipe(first()).subscribe((info: {teams: [string], referees: [string]}) => {
      this.teams = info.teams;
      this.referees = info.referees;
    });
  }

  public createMatch() {
    this.matchService.createMatch({
        home: this.f.home.value,
        away: this.f.away.value,
        referee: this.f.referee.value,
        date: moment(this.f.date.value).format('YYYY-MM-DD'),
        tournament: this.tournament
    }).subscribe();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addMatchForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
