import { RegisterComponent } from './register/register.component';
import { NgModule }             from '@angular/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './gaurds/index';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path : '', component: DetailsComponent, canActivate: [AuthGuard]},
    { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // , canActivate: [AuthGuard] 
    
    { path : 'register', component:RegisterComponent},
    { path : 'login', component: LoginComponent},
    { path : '**', redirectTo: ''},
    { path: 'map', redirectTo: 'map', pathMatch: 'full', canActivate: [AuthGuard] }
];

// export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class routing {}