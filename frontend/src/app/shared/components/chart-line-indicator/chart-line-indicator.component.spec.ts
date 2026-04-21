import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChartLineData } from '../../models/chart/chart-line-data';
import { TestingModule } from '../../tests';
import { ChartLineIndicatorComponent } from './chart-line-indicator.component';

describe(ChartLineIndicatorComponent.name, () => {
  let component: ChartLineIndicatorComponent;
  let fixture: ComponentFixture<ChartLineIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLineIndicatorComponent, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartLineIndicatorComponent);
    component = fixture.componentInstance;
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
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

  it(`(D) DEVE exibir mensagem 'Nenhum dado encontrado!'
      QUANDO (@Input value) for nulo.`, () => {
    component.value = null;
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(
      By.css('.content-empty-message')
    );

    expect((<HTMLElement>valueEl.nativeElement).innerText).toContain(
      'Nenhum dado encontrado!'
    );
  });

  it(`(D) DEVE exibir mensagem 'Nenhum dado encontrado!'
      QUANDO (@Input value) conter datasets vazios.`, () => {
    component.value = {
      xLabels: [],
      datasets: [],
    };
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(
      By.css('.content-empty-message')
    );

    expect((<HTMLElement>valueEl.nativeElement).innerText).toContain(
      'Nenhum dado encontrado!'
    );
  });

  it(`(D) DEVE exibir spinner
      QUANDO (@Input loading) for alterado para true.`, () => {
    component.loading = true;
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('app-spinner-indicator'));

    expect(<HTMLElement>valueEl.nativeElement).toBeTruthy();
  });

  it(`DEVE montar labels do eixo X para o formato do Chartjs
      QUANDO (@Input value) for passado com a propriedade 'xLabels' preenchida.`, () => {
    fixture.detectChanges();
    const value: ChartLineData = {
      xLabels: ['1'],
      datasets: [
        {
          label: 'Label 1',
          yData: [100],
        },
      ],
    };

    const valueChanges = new SimpleChange(null, value, false);
    component.value = value;
    component.ngOnChanges({
      value: valueChanges,
    });
    fixture.detectChanges();

    expect(component.lineChartData.labels?.[0]).toBe('1');
  });

  it(`DEVE montar labels do eixo Y para o formato do Chartjs
      QUANDO (@Input value) for passado com a propriedade 'datasets.yData' preenchida.`, () => {
    fixture.detectChanges();
    const value: ChartLineData = {
      xLabels: ['1'],
      datasets: [
        {
          label: 'Label 1',
          yData: [100],
        },
      ],
    };

    const valueChanges = new SimpleChange(null, value, false);
    component.value = value;
    component.ngOnChanges({
      value: valueChanges,
    });
    fixture.detectChanges();

    expect(component.lineChartData.datasets?.[0]?.data?.[0]).toBe(100);
  });

  it(`DEVE montar o nome do dataset para o formato do Chartjs
      QUANDO (@Input value) for passado com a propriedade 'datasets.label' preenchida.`, () => {
    fixture.detectChanges();
    const value: ChartLineData = {
      xLabels: ['1'],
      datasets: [
        {
          label: 'Label 1',
          yData: [100],
        },
      ],
    };

    const valueChanges = new SimpleChange(null, value, false);
    component.value = value;
    component.ngOnChanges({
      value: valueChanges,
    });
    fixture.detectChanges();

    expect(component.lineChartData.datasets?.[0]?.label).toBe('Label 1');
  });
});
