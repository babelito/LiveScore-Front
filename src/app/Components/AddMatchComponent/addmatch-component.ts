import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Match } from '../../Models/match';
import { MatchService } from '../../Services/match-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      console.log(this.findInvalidControls());
      return;
    }

    this.loading = true;
    this.createMatch();
  }

  private loadInfo() {
    this.matchService.getInfos().pipe(first()).subscribe((info: {teams: [string], referees: [string]}) => {
      this.teams = info.teams;
      this.referees = info.referees;
    });
  }

  private createMatch() {
    this.matchService.createMatch(this.f.home.value, this.f.away.value, this.f.referee.value, this.f.date.value);
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
