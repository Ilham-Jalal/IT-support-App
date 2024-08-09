import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest } from "../dto/LoginRequest";
import { SignUpRequest } from "../dto/SignUpRequest";
import {DecodejwtService} from "./decodejwt-service.service";
import {Role} from "../enum/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private decodejwtService: DecodejwtService
  ) { }

  login(loginRequest: LoginRequest): Observable<{ accessToken: string, user: { role: string } }> {
    return this.http.post<{ accessToken: string, user: { role: string } }>(`${this.apiUrl}/login`, loginRequest);
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  signUp(role: string, signUpRequest: SignUpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/signup/${role}`, signUpRequest);
  }

  public findIdByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/findi?username=${username}`);
  }

  getCurrentUserRole(): Role | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = this.decodejwtService.decodeToken(token);
      return decodedToken?.role || null;
    }
    return null;
  }

}
