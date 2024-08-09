import { Injectable, Injector } from '@angular/core';
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {
  private token: string | null = null;
  private authService: AuthService | null = null;

  constructor(private injector: Injector) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwt');
    }
  }

  private get auth(): AuthService {
    if (!this.authService) {
      this.authService = this.injector.get(AuthService);
    }
    return this.authService;
  }

  decodeToken(token: string) {
    // @ts-ignore
    return jwtDecode(token);
  }

  getUsernameFromToken(token: any): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken.sub;
  }

  getIdByUsername(token: any) {
    const username = this.getUsernameFromToken(token);
    return this.auth.findIdByUsername(username);
  }
}
