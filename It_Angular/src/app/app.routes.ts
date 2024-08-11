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
import {EquipmentListComponent} from "./equipment-list/equipment-list.component";
import {AddEquipmentComponent} from "./add-equipment/add-equipment.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'technician', component: DashTechnicianComponent, canActivate: [AuthGuard], data: { expectedRole: Role.TECHNICIAN } },
  { path: 'user', component: DashUserComponent, canActivate: [AuthGuard], data: { expectedRole: Role.USER } },
  { path: 'access-denied', component: AuthGuardComponent },
  { path: 'equipments', component: EquipmentListComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'add-equipment', component: AddEquipmentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
 // { path: 'edit-equipment/:id', component: EditEquipmentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
