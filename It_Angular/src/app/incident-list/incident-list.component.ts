import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../service/incident.service';
import { Incident } from '../model/Incident';
import { Router } from '@angular/router';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncidentStatus } from '../enum/IncidentStatus';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    NgClass,
    UpperCasePipe
  ]
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];
  displayedColumns: string[] = ['id', 'description', 'status', 'date', 'edit', 'delete'];

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

  getStatusClass(status: string): string {
    switch (status) {
      case IncidentStatus.REPORTED:
        return 'status-reported';
      case IncidentStatus.IN_PROGRESS:
        return 'status-in-progress';
      case IncidentStatus.RESOLVED:
        return 'status-resolved';
      case IncidentStatus.CLOSED:
        return 'status-closed';
      default:
        return '';
    }
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
    this.router.navigate(['/dashboard/incidents/update-incidents', id]);
  }
  addIncident(): void {
    this.router.navigate(['/dashboard/incidents/add-incidents']); // Adjust this route to your actual incident creation form
  }
}
