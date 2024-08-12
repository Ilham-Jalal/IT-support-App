import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecodejwtService } from './decodejwt-service.service';
import { LoginRequest } from '../dto/LoginRequest';
import { SignUpRequest } from '../dto/SignUpRequest';
import {Role} from "../enum/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private decodejwtService: DecodejwtService
  ) {}

  login(loginRequest: LoginRequest): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, loginRequest);
  }

  signUp(role: Role, signUpRequest: SignUpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/signup/${role}`, signUpRequest);
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log("tttttttttttttttttttt "+token)
      const decodedToken = this.decodejwtService.decodeToken(token);
      return decodedToken?.roles || null;
    }
    return null;
  }

  findIdByUsername(username: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/findi?username=${username}`);
  }
}
