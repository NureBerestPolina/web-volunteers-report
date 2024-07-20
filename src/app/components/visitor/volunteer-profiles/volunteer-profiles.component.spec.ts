import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerProfilesComponent } from './volunteer-profiles.component';

describe('VolunteerProfilesComponent', () => {
  let component: VolunteerProfilesComponent;
  let fixture: ComponentFixture<VolunteerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolunteerProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolunteerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
