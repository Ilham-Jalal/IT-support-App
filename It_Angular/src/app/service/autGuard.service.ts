import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { Role } from "../enum/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'] as Role;
    const userRole = this.authService.getCurrentUserRole();

    if (userRole && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
