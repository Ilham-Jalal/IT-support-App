import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentService } from '../service/incident.service'; // Assure-toi d'avoir le bon chemin
import { IncidentStatus } from '../enum/IncidentStatus';
import { NgIf, NgForOf } from '@angular/common';
import { Incident } from '../model/Incident';

@Component({
  selector: 'app-incident-update',
  templateUrl: './incident-update.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ]
})
export class IncidentUpdateComponent implements OnInit {
  incidentForm!: FormGroup;
  incidentStatuses = Object.values(IncidentStatus);
  incidentId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.incidentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadIncident();
    this.initForm();
  }

  initForm(): void {
    this.incidentForm = this.fb.group({
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  loadIncident(): void {
    this.incidentService.getIncidentById(this.incidentId).subscribe((incident: Incident) => {
      this.incidentForm.patchValue({
        description: incident.description,
        status: incident.status
      });
    });
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      const updatedIncident: Incident = { ...this.incidentForm.value, id: this.incidentId };
      this.incidentService.updateIncident(this.incidentId, updatedIncident).subscribe(() => {
        this.router.navigate(['/incidents']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
