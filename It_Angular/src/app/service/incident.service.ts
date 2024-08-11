import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from "../model/Incident";
import {Equipment} from "../model/Equipment";

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private apiUrl = `http://localhost:8080/admin/incidents`;

  constructor(private http: HttpClient) { }
  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/all`);
  }
  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/${id}`);
  }

  updateIncident(id: number, incident: Incident): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${id}`, incident);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getIncidentsByEquipment(equipmentId: number): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/${equipmentId}/equipment`);
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }
}
