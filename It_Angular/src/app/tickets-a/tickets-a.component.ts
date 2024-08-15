// tickets-a.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Ticket} from "../model/Ticket";
import {User} from "../model/User";
import {TicketService} from "../service/ticket.service";
import {TicketStatus} from "../enum/TicketStatus";
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
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-tickets-a',
  templateUrl: './tickets-a.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    NgClass,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    MatButton
  ],
  styleUrls: ['./tickets-a.component.scss']
})
export class TicketsAComponent implements OnInit {
  tickets: Ticket[] = [];
  technicians: User[] = [];
  displayedColumns: string[] = ['description', 'status', 'date', 'action'];
  selectedTicketId: number | null = null;
  assignForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.assignForm = this.fb.group({
      technicianId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
    this.loadTechnicians();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByAdmin().pipe(
      catchError(error => {
        console.error('Error fetching tickets', error);
        return of([]);
      })
    ).subscribe(tickets => this.tickets = tickets);
  }

  loadTechnicians(): void {
    this.ticketService.getTechnicians().pipe(
      catchError(error => {
        console.error('Error fetching technicians', error);
        return of([]);
      })
    ).subscribe(technicians => this.technicians = technicians);
  }

  onAssignClick(ticketId: number): void {
    this.selectedTicketId = ticketId;
  }

  assignTicket(): void {
    if (this.selectedTicketId === null) {
      console.error('No ticket selected for assignment');
      return;
    }

    const technicianId = this.assignForm.value.technicianId;
    this.ticketService.assignTicket(this.selectedTicketId, technicianId).pipe(
      catchError(error => {
        console.error('Error assigning ticket', error);
        return of(null);
      })
    ).subscribe(updatedTicket => {
      if (updatedTicket) {
        this.loadTickets(); // Refresh ticket list
        this.selectedTicketId = null; // Clear selected ticket
      }
    });
  }

  getStatusClass(status: TicketStatus): string {
    return {
      [TicketStatus.OPEN]: 'status-open',
      [TicketStatus.IN_PROGRESS]: 'status-in-progress',
      [TicketStatus.CLOSED]: 'status-closed',
      [TicketStatus.PENDING]: 'status-pending'
    }[status];
  }
}
