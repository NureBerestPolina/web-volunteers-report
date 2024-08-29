import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportCategoryComponent } from './add-report-category.component';

describe('AddReportCategoryComponent', () => {
  let component: AddReportCategoryComponent;
  let fixture: ComponentFixture<AddReportCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReportCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
