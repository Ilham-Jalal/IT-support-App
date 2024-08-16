import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatButton} from "@angular/material/button";
import {AuthService} from "../service/auth-service.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterLinkActive, MatButton],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentRoute$: Observable<string>;

  constructor(private router: Router,private authService:AuthService) {
    this.currentRoute$ = this.router.events.pipe(
      map(() => this.router.url)
    );
  }

  isActive(route: string): Observable<boolean> {
    return this.currentRoute$.pipe(map(currentRoute => currentRoute === route));
  }
  logoutit(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
