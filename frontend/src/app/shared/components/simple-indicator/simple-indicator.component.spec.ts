import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { SimpleIndicatorComponent } from './simple-indicator.component';

describe(SimpleIndicatorComponent.name, () => {
  let component: SimpleIndicatorComponent;
  let fixture: ComponentFixture<SimpleIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleIndicatorComponent);
    component = fixture.componentInstance;
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) DEVE exibir valor 50
      QUANDO (@Input value) for alterado para 50.`, () => {
    component.value = 50;
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('.content-value'));

    expect((<HTMLElement>valueEl.nativeElement).innerText).toContain('50');
  });

  it(`(D) DEVE exibir valor '-'
      QUANDO (@Input value) estiver nulo e for informada a propriedade (@Input valueIfNull) como '-'.`, () => {
    component.value = null;
    component.valueIfNull = '-';
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('.content-value'));

    expect((<HTMLElement>valueEl.nativeElement).innerText).toContain('-');
  });

  it(`(D) DEVE exibir título 'Título teste'
      QUANDO (@Input title) for alterado para 'Título teste'.`, () => {
    component.title = 'Título teste';
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('.content-title'));

    expect((<HTMLElement>valueEl.nativeElement).innerText).toContain(
      'Título teste'
    );
  });

  it(`(D) DEVE exibir spinner
      QUANDO (@Input loading) for alterado para true.`, () => {
    component.loading = true;
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('app-spinner-indicator'));

    expect(<HTMLElement>valueEl.nativeElement).toBeTruthy();
  });
});
