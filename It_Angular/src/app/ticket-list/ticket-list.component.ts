import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/Ticket';
import { TicketService } from '../service/ticket.service';
import {DatePipe, NgClass} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    MatToolbar,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    NgClass,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ]
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedColumns: string[] = ['description', 'status', 'date'];

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

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'status-open';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'CLOSED':
        return 'status-closed';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  }
}
