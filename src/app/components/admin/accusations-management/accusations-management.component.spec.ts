import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccusationsManagementComponent } from './accusations-management.component';

describe('AccusationsManagementComponent', () => {
  let component: AccusationsManagementComponent;
  let fixture: ComponentFixture<AccusationsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccusationsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccusationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
