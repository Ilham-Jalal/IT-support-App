import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../service/incident.service';
import { Incident } from '../model/Incident';
import {DatePipe, NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink
  ],
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];
  selectedIncident?: Incident;

  constructor(private incidentService: IncidentService, private router: Router) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe(
      (incidents: Incident[]) => this.incidents = incidents,
      (error: any) => console.error('Error loading incidents', error)
    );
  }

  deleteIncident(id: number): void {
    this.incidentService.deleteIncident(id).subscribe(
      () => {
        this.incidents = this.incidents.filter(incident => incident.id !== id);
      },
      (error: any) => console.error('Error deleting incident', error)
    );
  }


  editIncident(id: number): void {
    this.router.navigate(['/update-incidents', id]);
  }

}
