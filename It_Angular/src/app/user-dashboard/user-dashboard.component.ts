import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import {AsyncPipe, NgClass} from '@angular/common';
import {AuthService} from "../service/auth-service.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls:['./user-dashboard.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterOutlet,
    MatIcon,
    RouterLinkActive,
    NgClass,
    RouterLink,
    AsyncPipe,
    MatButton
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
  ],
})
export class UserDashboardComponent implements OnInit {
  animationState = 'in'; // or 'out' based on your logic
  currentRoute$: Observable<string> | undefined;

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    );
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logoutit(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
