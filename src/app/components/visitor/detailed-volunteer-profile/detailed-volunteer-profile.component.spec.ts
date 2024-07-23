import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedVolunteerProfileComponent } from './detailed-volunteer-profile.component';

describe('DetailedVolunteerProfileComponent', () => {
  let component: DetailedVolunteerProfileComponent;
  let fixture: ComponentFixture<DetailedVolunteerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedVolunteerProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedVolunteerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
