import { Component, OnInit } from '@angular/core';
import { Equipment } from '../model/Equipment';
import { EquipmentService } from '../service/equipment.service';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common'; // Assure-toi que CommonModule est importé ici

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  standalone: true,
  imports: [
    CommonModule, // Ajoute CommonModule ici
    RouterLink
  ]
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];

  constructor(private equipmentService: EquipmentService, private router: Router) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe({
      next: data => {
        console.log('Equipments received:', data);
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
    this.router.navigate(['/edit-equipment', id]);
  }
}
