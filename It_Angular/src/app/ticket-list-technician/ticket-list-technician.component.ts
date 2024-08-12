import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/Ticket';
import { TicketService } from '../service/ticket.service';
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {EquipmentService} from "../service/equipment.service";
import {IncidentService} from "../service/incident.service";
import {Equipment} from "../model/Equipment";
import {Incident} from "../model/Incident";

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
  equipments:Equipment[]=[];
  incidents:Incident[]=[]

  constructor(private ticketService: TicketService, private equipment: EquipmentService,private incicidentService:IncidentService,private router:Router) { }

  ngOnInit(): void {
    this.loadTickets();
    this.loadEquipment();
    this.loadIncident();

  }
  loadTickets(): void {
    this.ticketService.getTicketsByTechnician().subscribe(
      data => this.tickets = data,

    );
  }  loadEquipment(): void {
    this.equipment.getAllEquipments().subscribe(
      data => {
        console.log('Equipments loaded', data); // Log loaded data
        this.equipments = data;
      },
      error => console.error('Error loading equipment', error)
    );
  }

  loadIncident(): void {
    this.incicidentService.getAllIncidents().subscribe(
      data => {
        console.log('Incidents loaded', data); // Log loaded data
        this.incidents = data;
      },
      error => console.error('Error loading incidents', error)
    );
  }

  editTicket(id: number): void {
    this.router.navigate(['/technician-updateTicket', id]);
  }
}
