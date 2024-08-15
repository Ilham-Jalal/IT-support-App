import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {Router,ActivatedRoute} from "@angular/router";
import { EquipmentService } from '../service/equipment.service';
import { Equipment } from '../model/Equipment';
import { EquipmentStatus } from '../enum/EquipmentStatus';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class AddEquipmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private equipmentService = inject(EquipmentService);




  @Output() addedEquipment = new EventEmitter<void>();
  @Output() closeDialog = new EventEmitter<void>();

  equipmentForm!: FormGroup;
  equipmentStatuses = Object.values(EquipmentStatus);

  constructor(private myRouter:Router,private activeRouter:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['', Validators.required]
    });
    console.log("______________________________________________________");
    console.log(this.equipmentStatuses); // Check if this prints the expected values

  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipment: Equipment = this.equipmentForm.value;
      this.equipmentService.addEquipment(equipment).subscribe(() => {
        this.addedEquipment.emit();
      });
      this.myRouter.navigate(['../'],{relativeTo:this.activeRouter})
    } else {
      console.log('Form is invalid');
    }
  }

  close(): void {
    this.closeDialog.emit();
  }
}
