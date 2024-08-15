import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {RouterOutlet} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatButton
  ],
})
export class AppComponent {

}
