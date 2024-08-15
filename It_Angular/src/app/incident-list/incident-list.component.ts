import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../service/incident.service';
import { Incident } from '../model/Incident';
import {Router, RouterLink} from "@angular/router";
import {DatePipe, NgClass, NgForOf, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink
  ]
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];

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

  getStatusClass(status: string): string {
    return `status-${status.replace(/\s+/g, '_').toLowerCase()}`;
  }
}
