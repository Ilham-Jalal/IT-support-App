import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet, RouterLink} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {AsyncPipe, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dash-technician',
  templateUrl: './dash-technician.component.html',
  styleUrls: ['./dash-technician.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(-100%)'})),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
  ],
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
    MatIcon,
    AsyncPipe
  ],
  standalone: true
})
export class DashTechnicianComponent implements OnInit {
  animationState = 'in'; // Adjust based on your logic
  currentRoute$: Observable<string> | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    );
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
