// update-equipment.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../service/equipment.service'; // Update with your service path
import { EquipmentStatus } from '../enum/EquipmentStatus';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ]
})
export class UpdateEquipmentComponent implements OnInit {
  equipmentForm!: FormGroup;
  equipmentStatuses = Object.values(EquipmentStatus);
  equipmentId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService // Inject your service
  ) {

  }

  ngOnInit(): void {
    this.equipmentId = +this.route.snapshot.paramMap.get('id')!; // Get the ID from route
    this.loadEquipment();
    this.initForm();
  }
  initForm(): void {
    this.equipmentForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    status: ['', Validators.required]
  });}
  loadEquipment(): void {
    this.equipmentService.getEquipmentById(this.equipmentId).subscribe(equipment => {
      this.equipmentForm.patchValue({
        name: equipment.name,
        description: equipment.description,
        status: equipment.status
      });
    });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      this.equipmentService.updateEquipment(this.equipmentId, this.equipmentForm.value).subscribe(() => {
        this.router.navigate(['/equipments']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
