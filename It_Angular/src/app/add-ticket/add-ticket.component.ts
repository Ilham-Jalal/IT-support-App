import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Equipment} from "../model/Equipment";
import {Incident} from "../model/Incident";
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../model/Ticket";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ]
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  equipments: Equipment[] = [];
  incidents: Incident[] = [];

  constructor(private fb: FormBuilder, private ticketService: TicketService, private router:Router) {
    this.ticketForm = this.fb.group({
      incidentId: [null, Validators.required],
      equipmentId: [null, Validators.required],
      dateCreated: [new Date().toISOString().substring(0, 10), Validators.required], // Par défaut, la date du jour
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEquipments();
    this.loadIncidents();
  }

  loadEquipments(): void {
    this.ticketService.getEquipments().subscribe(
      (equipments: Equipment[]) => this.equipments = equipments,
      (error) => console.error('Erreur lors du chargement des équipements', error)
    );
  }

  loadIncidents(): void {
    this.ticketService.getIncidents().subscribe(
      (incidents: Incident[]) => this.incidents = incidents,
      (error) => console.error('Erreur lors du chargement des incidents', error)
    );
  }

  addTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketService.addTicket(this.ticketForm.value).subscribe(
        (newTicket: Ticket) => {
          console.log('Ticket ajouté', newTicket);
          this.router.navigate(['/tickets']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du ticket', error);
        }
      );
    }
  }
}
