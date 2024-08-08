import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachedAccusationLimitationComponent } from './reached-accusation-limitation.component';

describe('ReachedAccusationLimitationComponent', () => {
  let component: ReachedAccusationLimitationComponent;
  let fixture: ComponentFixture<ReachedAccusationLimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReachedAccusationLimitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReachedAccusationLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
