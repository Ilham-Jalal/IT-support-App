import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAComponent } from './tickets-a.component';

describe('TicketsAComponent', () => {
  let component: TicketsAComponent;
  let fixture: ComponentFixture<TicketsAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
