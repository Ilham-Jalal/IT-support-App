import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashTechnicianComponent } from "./dash-technician/dash-technician.component";
import { DashUserComponent } from "./dash-user/dash-user.component";
import { AuthGuardComponent } from "./auth-guard/auth-guard.component";
import { Role } from "./enum/Role";
import {AuthGuard} from "./service/autGuard.service";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'technician', component: DashTechnicianComponent, canActivate: [AuthGuard], data: { expectedRole: Role.TECHNICIAN } },
  { path: 'user', component: DashUserComponent, canActivate: [AuthGuard], data: { expectedRole: Role.USER } },
  { path: 'access-denied', component: AuthGuardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Optional: redirect to login if the path is empty
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
