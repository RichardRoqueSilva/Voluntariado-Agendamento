import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerIndicatorComponent } from './spinner-indicator.component';

describe(SpinnerIndicatorComponent.name, () => {
  let component: SpinnerIndicatorComponent;
  let fixture: ComponentFixture<SpinnerIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });
});
