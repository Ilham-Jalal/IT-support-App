import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from '../model/Ticket';
import { TicketService } from '../service/ticket.service';
import { EquipmentService } from '../service/equipment.service';
import { IncidentService } from '../service/incident.service';
import { Router } from '@angular/router';
import { Equipment } from '../model/Equipment';
import { Incident } from '../model/Incident';
import { TicketStatus } from '../enum/TicketStatus';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-ticket-list-technician',
  templateUrl: './ticket-list-technician.component.html',
  styleUrls: ['./ticket-list-technician.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
    NgClass,
    NgIf
  ]
})
export class TicketListTechnicianComponent implements OnInit {
  tickets: Ticket[] = [];
  equipments: Equipment[] = [];
  incidents: Incident[] = [];
  statusForm: FormGroup;
  selectedTicketId?: number;
  ticketStatus = Object.values(TicketStatus);

  constructor(
    private ticketService: TicketService,
    private equipmentService: EquipmentService,
    private incidentService: IncidentService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
    this.loadEquipments();
    this.loadIncidents();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByTechnician().subscribe(
      data => this.tickets = data,
      error => console.error('Error loading tickets', error)
    );
  }

  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe(
      data => {
        console.log('Equipments loaded', data);
        this.equipments = data;
      },
      error => console.error('Error loading equipment', error)
    );
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe(
      data => {
        console.log('Incidents loaded', data);
        this.incidents = data;
      },
      error => console.error('Error loading incidents', error)
    );
  }

  editTicket(id: number): void {
    this.selectedTicketId = id;
    this.ticketService.getTicketById(id).subscribe(ticket => {
      this.statusForm.patchValue({ status: ticket.status });
    });
  }

  onSubmit(): void {
    if (this.statusForm.valid && this.selectedTicketId !== undefined) {
      const status = this.statusForm.get('status')?.value as TicketStatus;
      this.ticketService.updateTicketStatus(this.selectedTicketId, status).subscribe(
        () => {
          this.loadTickets(); // Refresh the list
          this.selectedTicketId = undefined; // Close the form
        },
        error => console.error('Error updating ticket status', error)
      );
    }
  }

  getStatusClass(status: TicketStatus): string {
    switch (status) {
      case TicketStatus.OPEN:
        return 'status-open';
      case TicketStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TicketStatus.CLOSED:
        return 'status-closed';
      case TicketStatus.PENDING:
        return 'status-pending';
      default:
        return '';
    }
  }
}
