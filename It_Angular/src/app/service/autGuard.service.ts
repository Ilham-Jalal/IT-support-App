import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth-service.service";
import {Role} from "../enum/Role";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'] as Role;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    const userRole = await this.authService.getCurrentUserRole();

    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);

    if (userRole && userRole.toUpperCase() === expectedRole.toUpperCase()) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
