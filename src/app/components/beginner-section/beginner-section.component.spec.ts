import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginnerSectionComponent } from './beginner-section.component';

describe('BeginnerSectionComponent', () => {
  let component: BeginnerSectionComponent;
  let fixture: ComponentFixture<BeginnerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeginnerSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeginnerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
