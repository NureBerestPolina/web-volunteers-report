import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedVolunteerStatisticsComponent } from './detailed-volunteer-statistics.component';

describe('DetailedVolunteerStatisticsComponent', () => {
  let component: DetailedVolunteerStatisticsComponent;
  let fixture: ComponentFixture<DetailedVolunteerStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedVolunteerStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedVolunteerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
