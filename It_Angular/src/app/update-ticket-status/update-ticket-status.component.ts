import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../service/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketStatus } from "../enum/TicketStatus";
import { NgForOf } from "@angular/common";
import {Ticket} from "../model/Ticket";
import {Incident} from "../model/Incident";

@Component({
  selector: 'app-update-ticket-status',
  templateUrl: './update-ticket-status.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf]
})
export class UpdateTicketStatusComponent implements OnInit {
  statusForm!: FormGroup;
  ticketId!: number;
  ticketStatus = Object.values(TicketStatus);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) {
  }

  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTicket();
    this.initForm();
  }
  initForm(): void {
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });
    }


  loadTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe(
      ticket => {
        this.statusForm.patchValue({ status: ticket.status });
      });
  }




  onSubmit(): void {
    if (this.statusForm.valid) {
      const updatedTicket: Ticket = { ...this.statusForm.value};

      this.ticketService.updateTicketStatus(this.ticketId,updatedTicket).subscribe(
        () => {
          this.router.navigate(['/technician-ticket']);
        },
      );
    }
  }


}
