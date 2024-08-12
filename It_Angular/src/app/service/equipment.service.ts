import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Equipment} from "../model/Equipment";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/admin/${id}`);
  }
  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}/equipment/all`);
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}/admin`, equipment);
  }

  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.baseUrl}/admin/${id}`, equipment);
  }

  deleteEquipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/${id}`);
  }
}
