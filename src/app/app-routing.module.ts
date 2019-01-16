import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/HomeComponent/home-component';
import { LoginComponent } from './Components/LoginComponent/login-component';
import { AuthenticationService } from './Services/authentication-service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationService] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
