import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {
  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || null;
  }

  getUserRole(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.roles || null; // Make sure 'roles' matches the token property
  }
}
