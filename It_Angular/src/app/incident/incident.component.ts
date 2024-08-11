import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../service/incident.service';
import { Incident } from '../model/Incident';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
})
export class IncidentComponent implements OnInit {
  incidents: Incident[] = [];
  equipmentId: number | null = null ;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.equipmentId = 1;

    if (this.equipmentId !== null) {
      this.loadIncidentsByEquipment(this.equipmentId);
    }
  }

  loadIncidentsByEquipment(equipmentId: number): void {
    this.incidentService.getIncidentsByEquipment(equipmentId).subscribe((data: Incident[]) => {
      this.incidents = data;
    });
  }
}
