import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListTechnicianComponent } from './ticket-list-technician.component';

describe('TicketListTechnicianComponent', () => {
  let component: TicketListTechnicianComponent;
  let fixture: ComponentFixture<TicketListTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketListTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketListTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
