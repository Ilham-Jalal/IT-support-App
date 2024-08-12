import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ]
})
export class AssignTicketComponent implements OnInit {
  assignForm: FormGroup;
  tickets: Ticket[] = [];
  technicians: User[] = [];

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.assignForm = this.fb.group({
      ticketId: [null, Validators.required],
      technicianId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
    this.loadTechnicians();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByAdmin().subscribe(
      data => this.tickets = data,
      error => console.error(error)
    );
  }

  loadTechnicians(): void {
    this.ticketService.getTechnicians().subscribe(
      data => this.technicians = data,
      error => console.error(error)
    );
  }

  assignTicket(): void {
    if (this.assignForm.valid) {
      const { ticketId, technicianId } = this.assignForm.value;
      this.ticketService.assignTicket(ticketId, technicianId).subscribe(
        response => {
          console.log('Ticket assigned', response);
          this.assignForm.reset();
        },
        error => console.error('Error assigning ticket', error)
      );
    }
  }
}
