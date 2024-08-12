import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from "../model/Ticket";
import { Equipment } from "../model/Equipment";
import { Incident } from "../model/Incident";
import { User } from "../model/User";
import { TicketStatus } from "../enum/TicketStatus";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/technicians`);
  }

  addTicket(ticketData: { incidentId: number, equipmentId: number, description: string }): Observable<Ticket> {
    const userId = this.getUserId(); // Placeholder method to get user ID
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

  assignTicket(ticketId: number, userId: number): Observable<Ticket[]> {
    return this.http.put<Ticket[]>(`${this.baseUrl}/admin/tickets/${ticketId}/assign/${userId}`, {});
  }

  getTicketsByAdmin(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/admin/tickets`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/users`);
  }

  public updateTicketStatus(id:number,ticket:Ticket): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/technician/tickets/${id}`,ticket);
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/technician/tickets/${ticketId}`);
  }

  private getUserId(): number {
    return 1; // Replace with actual logic to get the user ID
  }
}
