import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/HomeComponent/home-component';
import { LoginComponent } from './Components/LoginComponent/login-component';
import { AddMatchComponent } from './Components/AddMatchComponent/addmatch-component';
import { AuthenticationService } from './Services/authentication-service';
import { TournamentComponent } from './Components/TournamentComponent/tournament-component';
import { AddTournamentComponent } from './Components/AddTournamentComponent/addtournament-component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationService] },
  { path: 'addMatch/:id', component: AddMatchComponent, canActivate: [AuthenticationService] },
  { path: 'tournament/:id', component: TournamentComponent, canActivate: [AuthenticationService] },
  { path: 'addTournament', component: AddTournamentComponent, canActivate: [AuthenticationService] },

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
