import { Component, OnInit } from '@angular/core';
import {Ticket} from "../model/Ticket";
import {TicketService} from "../service/ticket.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tickets-a',
  templateUrl: './tickets-a.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./tickets-a.component.scss']
})
export class TicketsAComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getTicketsByAdmin().subscribe(
      (data: Ticket[]) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets', error);
      }
    );
  }
}
