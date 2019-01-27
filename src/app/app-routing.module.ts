import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/HomeComponent/home-component';
import { LoginComponent } from './Components/LoginComponent/login-component';
import { AddMatchComponent } from './Components/AddMatchComponent/addmatch-component';
import { AuthenticationService } from './Services/authentication-service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationService] },
  { path: 'addMatch', component: AddMatchComponent, canActivate: [AuthenticationService] },

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
