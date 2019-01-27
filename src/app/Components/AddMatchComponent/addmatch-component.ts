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
  loaded = false;
  addMatchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMatchForm = this.formBuilder.group({
      dom: ['', Validators.required],
      ext: ['', Validators.required],
      arbitre: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.loadInfo();
  }

  get f() { return this.addMatchForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.addMatchForm.invalid) {
      return;
    }
  }

  public setLoaded() {
    this.loaded = true;
  }

  private loadInfo() {
    const matchService = this.matchService;
    const promise = new Promise(function(resolve, reject) {
      matchService.getMatches().pipe(first()).subscribe(matches => {
        this.matches = matches;
        resolve('ok');
      });
    });

    promise.then(
      // this.setLoaded()
    );


  }
}
