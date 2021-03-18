import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepComponent } from './aep.component';

describe('AepComponent', () => {
  let component: AepComponent;
  let fixture: ComponentFixture<AepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
