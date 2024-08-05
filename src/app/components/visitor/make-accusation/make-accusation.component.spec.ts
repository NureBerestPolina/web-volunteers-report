import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAccusationComponent } from './make-accusation.component';

describe('MakeAccusationComponent', () => {
  let component: MakeAccusationComponent;
  let fixture: ComponentFixture<MakeAccusationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeAccusationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeAccusationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
