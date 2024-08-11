import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentService } from '../service/incident.service';
import { Incident } from '../model/Incident';
import { IncidentStatus } from '../enum/IncidentStatus';
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent implements OnInit {
  incidentForm!: FormGroup;
  incidentStatuses = IncidentStatus;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
      description: ['', Validators.required],
      dateDetected: [new Date().toISOString().split('T')[0], Validators.required],
      status: [IncidentStatus.REPORTED, Validators.required]
    });
  }

  createIncident(): void {
    if (this.incidentForm.valid) {
      const incident: Incident = this.incidentForm.value;
      this.incidentService.createIncident(incident).subscribe(
        () => {
          this.router.navigate(['/incidents']);
        }
      );
    }
  }
}
