import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/Ticket';
import { TicketService } from '../service/ticket.service';
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket-list-technician',
  templateUrl: './ticket-list-technician.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ]
})
export class TicketListTechnicianComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService,private router:Router) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByTechnician().subscribe(
      data => this.tickets = data,
      error => console.error(error)
    );
  }
  editTicket(id: number): void {
    this.router.navigate(['/technician-updateTicket', id]);
  }
}
