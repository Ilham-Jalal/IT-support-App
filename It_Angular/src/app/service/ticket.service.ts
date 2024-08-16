import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from "../model/Ticket";
import { Equipment } from "../model/Equipment";
import { Incident } from "../model/Incident";
import { User } from "../model/User";
import {TicketStatus} from "../enum/TicketStatus";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/technicians`);
  }

  addTicket(ticketData: { incidentId: number, equipmentId: number, description: string }): Observable<Ticket> {
    const userId = this.getUserId();
    return this.http.post<Ticket>(`${this.baseUrl}/user/${userId}/tickets/${ticketData.equipmentId}`, ticketData);
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}/equipment/all`);
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.baseUrl}/incidents/all`);
  }

  getTicketsByUser(): Observable<Ticket[]> {
    const userId = this.getUserId();
    return this.http.get<Ticket[]>(`${this.baseUrl}/user/tickets`);
  }

  getTicketsByTechnician(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/technician/tickets`);
  }

  assignTicket(ticketId: number, userId: number): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/admin/tickets/${ticketId}/assign/${userId}`, {});
  }

  getTicketsByAdmin(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/admin/tickets`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/users`);
  }

  updateTicketStatus(id: number, status: TicketStatus): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/technician/tickets/${id}`, { status });
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/technician/tickets/${ticketId}`);
  }

  private getUserId(): number {
    // This should be replaced with the actual logic to retrieve the user's ID
    return 1;
  }
}
