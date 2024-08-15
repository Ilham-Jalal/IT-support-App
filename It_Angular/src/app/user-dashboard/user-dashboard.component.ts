import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../model/Ticket';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
})
export class UserDashboardComponent implements OnInit {

  userTickets: Ticket[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadUserTickets();
  }

  loadUserTickets(): void {
    this.ticketService.getTicketsByUser().subscribe(
      (tickets) => {
        this.userTickets = tickets;
      },
      (error) => {
        console.error('Error fetching user tickets:', error);
      }
    );
  }
}
