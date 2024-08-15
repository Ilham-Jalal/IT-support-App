import { Component, OnInit } from '@angular/core';
import { Equipment } from '../model/Equipment';
import { EquipmentService } from '../service/equipment.service';
import {Router, RouterLink} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEquipmentComponent } from '../add-equipment/add-equipment.component';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AddEquipmentComponent,
    RouterLink
  ]
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];
  showForm = false; // Initialize showForm to false

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe({
      next: data => {
        this.equipments = data;
      },
      error: error => {
        console.error('Error fetching equipments:', error);
      }
    });
  }

  deleteEquipment(id: number): void {
    this.equipmentService.deleteEquipment(id).subscribe(() => {
      this.loadEquipments();
    });
  }

  editEquipment(id: number): void {
    this.router.navigate(['/dashboard/equipments/edit-equipment', id]);
  }



  openAddEquipmentDialog(): void {
    const dialogRef = this.dialog.open(AddEquipmentComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadEquipments();
      }
    });
  }
}
