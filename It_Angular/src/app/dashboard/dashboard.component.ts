import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentRoute$: Observable<string>;

  constructor(private router: Router) {
    this.currentRoute$ = this.router.events.pipe(
      map(() => this.router.url)
    );
  }

  isActive(route: string): Observable<boolean> {
    return this.currentRoute$.pipe(map(currentRoute => currentRoute === route));
  }
}
