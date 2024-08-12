import { Component, OnInit } from '@angular/core';
import { Ticket } from "../model/Ticket";
import { TicketService } from "../service/ticket.service";
import { DatePipe, NgForOf } from "@angular/common";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByUser().subscribe(
      data => this.tickets = data,
      error => console.error(error)
    );
  }
}
