import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashTechnicianComponent } from "./dash-technician/dash-technician.component";
import { DashUserComponent } from "./dash-user/dash-user.component";
import { AuthGuardComponent } from "./auth-guard/auth-guard.component";
import { Role } from "./enum/Role";
import {Guard} from "./service/autGuard.service";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [Guard], data: { expectedRole: Role.ADMIN }},
  { path: 'dashboard', component: DashboardComponent, canActivate: [Guard], data: { expectedRole: Role.ADMIN }},
  { path: 'technician', component: DashTechnicianComponent, canActivate: [Guard], data: { expectedRole: Role.TECHNICIAN }},
  { path: 'user', component: DashUserComponent, canActivate: [Guard], data: { expectedRole: Role.USER }},
  { path: 'access-denied', component: AuthGuardComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
