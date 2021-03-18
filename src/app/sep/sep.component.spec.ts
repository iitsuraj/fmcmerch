import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepComponent } from './sep.component';

describe('SepComponent', () => {
  let component: SepComponent;
  let fixture: ComponentFixture<SepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
