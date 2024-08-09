import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecodejwtService } from './decodejwt-service.service';
import { LoginRequest } from '../dto/LoginRequest';
import { SignUpRequest } from '../dto/SignUpRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private decodejwtService: DecodejwtService
  ) { }

  login(loginRequest: LoginRequest): Observable<{ token: string, role: string }> {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, loginRequest);
  }

  signUp(role: string, signUpRequest: SignUpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/signup/${role}`, signUpRequest);
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = this.decodejwtService.decodeToken(token);
      return decodedToken?.role || null;
    }
    return null;
  }

  public findIdByUsername(username: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/findi?username=${username}`);
  }
}
