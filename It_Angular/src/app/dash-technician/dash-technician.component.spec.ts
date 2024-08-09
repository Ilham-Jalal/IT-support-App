import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTechnicianComponent } from './dash-technician.component';

describe('DashTechnicianComponent', () => {
  let component: DashTechnicianComponent;
  let fixture: ComponentFixture<DashTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
