import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ticket} from "../model/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Ajouter un ticket
  addTicket(ticketData: { incidentId: number, equipmentId: number, description: string }): Observable<Ticket> {
    const userId = this.getUserId();
    return this.http.post<Ticket>(`${this.baseUrl}/user/${userId}/tickets/${ticketData.equipmentId}`, ticketData);
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

  updateTicketStatus(ticketId: number, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/technician/tickets/${ticketId}`, { status });
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/admin/tickets/${ticketId}`);
  }

  // Méthode pour obtenir l'ID utilisateur (à remplacer par ta logique réelle)
  private getUserId(): number {
    // Remplace par la logique pour récupérer l'ID utilisateur, par exemple depuis le stockage local
    return 1; // Valeur par défaut pour l'exemple
  }
}
