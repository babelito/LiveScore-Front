import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

import { MatchService } from '../../Services/match-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  templateUrl: './addtournament-component.html',
  styleUrls: ['./addtournament-component.css']
})

export class AddTournamentComponent implements OnInit {
  addTournamentForm: FormGroup;
  teams: [string];
  referees: [string];
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addTournamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      teams: [[], Validators.required]
    });

    this.returnUrl = '/';

    this.loadInfo();
  }

  get f() { return this.addTournamentForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.addTournamentForm.invalid) {
      console.log(this.findInvalidControls());
      return;
    }

    this.loading = true;
    this.createTournament();
  }

  private loadInfo() {
    this.matchService.getInfo().pipe(first()).subscribe((info: {teams: [string], referees: [string]}) => {
      this.teams = info.teams;
      this.referees = info.referees;
    });
  }

  public createTournament() {
    this.matchService.createTournament({
        name: this.f.name.value,
        teams: this.f.teams.value
    }).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      }
    );
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addTournamentForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
