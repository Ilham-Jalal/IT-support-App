import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatNavList
  ],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      state('out', style({opacity: 0})),
      transition('out => in', [
        animate('0.5s ease-in')
      ]),
      transition('in => out', [
        animate('0.5s ease-out')
      ]),
    ]),
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(-100%)'})),
      transition('out => in', [
        animate('0.5s ease-in')
      ]),
      transition('in => out', [
        animate('0.5s ease-out')
      ]),
    ])
  ]
})
export class DashboardComponent {
  animationState = 'in'; // or 'out' based on your logic

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  toggleAnimation(): void {
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
  }
}
