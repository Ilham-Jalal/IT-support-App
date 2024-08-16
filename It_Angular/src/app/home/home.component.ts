import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatToolbar
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
