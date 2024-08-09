import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {
  decodeToken(token: string) {
    // @ts-ignore
    return jwtDecode(token);
  }

  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || null;
  }
}
