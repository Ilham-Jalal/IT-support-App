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
import {UpdateEquipmentComponent} from "./update-equipment/update-equipment.component";
import {IncidentComponent} from "./incident/incident.component";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {CreateIncidentComponent} from "./create-incident/create-incident.component";
import {IncidentUpdateComponent} from "./incident-update/incident-update.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {AssignTicketComponent} from "./assign-ticket/assign-ticket.component";
import {TicketListTechnicianComponent} from "./ticket-list-technician/ticket-list-technician.component";
import {UpdateTicketStatusComponent} from "./update-ticket-status/update-ticket-status.component";
import {UserListComponent} from "./user-list/user-list.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'technician', component: DashTechnicianComponent, canActivate: [AuthGuard], data: { expectedRole: Role.TECHNICIAN } },
  { path: 'user', component: DashUserComponent, canActivate: [AuthGuard], data: { expectedRole: Role.USER } },
  { path: 'access-denied', component: AuthGuardComponent },
  { path: 'equipments', component: EquipmentListComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'add-equipment', component: AddEquipmentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'edit-equipment/:id', component: UpdateEquipmentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'incidentsByEQ', component: IncidentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'incidents', component: IncidentListComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'add-incidents', component: CreateIncidentComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'update-incidents/:id', component: IncidentUpdateComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'tickets', component: TicketListComponent, canActivate: [AuthGuard], data: { expectedRole: Role.USER } },
  { path: 'add-ticket', component: AddTicketComponent, canActivate: [AuthGuard], data: { expectedRole: Role.USER } },
  { path: 'assign', component: AssignTicketComponent, canActivate: [AuthGuard], data: { expectedRole: Role.ADMIN } },
  { path: 'technician-ticket', component: TicketListTechnicianComponent, canActivate: [AuthGuard], data: { expectedRole: Role.TECHNICIAN } },
  { path: 'technician-updateTicket/:id', component: UpdateTicketStatusComponent, canActivate: [AuthGuard], data: { expectedRole: Role.TECHNICIAN } },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
