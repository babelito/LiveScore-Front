import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app-routing.module';

import { LoginService } from './Services/login-service';
import { UserService } from './Services/user-service';
import { AuthenticationService } from './Services/authentication-service';

import { ContainerComponent } from './Components/ContainerComponent/container-component';
import { HomeComponent } from './Components/HomeComponent/home-component';
import { LoginComponent } from './Components/LoginComponent/login-component';
import { MatchService } from './Services/match-service';
import { AddMatchComponent } from './Components/AddMatchComponent/addmatch-component';
import { AddTournamentComponent } from './Components/AddTournamentComponent/addtournament-component';
import { TournamentComponent } from './Components/TournamentComponent/tournament-component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    ContainerComponent,
    HomeComponent,
    LoginComponent,
    AddMatchComponent,
    TournamentComponent,
    AddTournamentComponent
  ],
  providers: [
    AuthenticationService,
    LoginService,
    UserService,
    MatchService
  ],
  bootstrap: [ContainerComponent]
})

export class AppModule { }
