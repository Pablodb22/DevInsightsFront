import { Routes } from '@angular/router';
import { LandingComponent }   from './presentation/pages/landing/landing.components';
import { LoginComponent }     from './presentation/pages/login/login.components';
import { RegisterComponent }  from './presentation/pages/register/register.components';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.components';
import { SettingsComponent }  from './presentation/pages/settings/settings.components';
import { authGuard } from './core/guards/auth.guard';
import { dataSettingsResolver } from './core/resolver/data-settings.resolver';


export const routes: Routes = [
  { path: '',         component: LandingComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
    resolve:{user: dataSettingsResolver}
  },
  { path: '**', redirectTo: '' }  
];