// add-equipment.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentStatus } from '../enum/EquipmentStatus';
import { NgForOf, NgIf } from '@angular/common';
import {EquipmentService} from "../service/equipment.service";
import {Equipment} from "../model/Equipment";

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class AddEquipmentComponent implements OnInit {
  equipmentForm!: FormGroup;
  equipmentStatuses = Object.values(EquipmentStatus);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private equipmentService:EquipmentService) {

  }

  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const equipment: Equipment= this.equipmentForm.value;
    this.equipmentService.addEquipment(equipment).subscribe(
      ()=>{
        this.router.navigate(['/equipments']);
      }
    );
    if (this.equipmentForm.valid) {
      console.log('Form Value:', this.equipmentForm.value);

    } else {
      console.log('Form is invalid');
    }
  }
}
