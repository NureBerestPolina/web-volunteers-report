import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategoriesManagementComponent } from './report-categories-management.component';

describe('ReportCategoriesManagementComponent', () => {
  let component: ReportCategoriesManagementComponent;
  let fixture: ComponentFixture<ReportCategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCategoriesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
