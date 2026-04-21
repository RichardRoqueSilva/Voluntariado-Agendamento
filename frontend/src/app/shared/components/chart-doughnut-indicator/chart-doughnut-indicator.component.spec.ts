import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontSpec } from 'chart.js';
import { ChartDoughnutData } from '../../models/chart/chart-doughnut-data';
import { FontSizeService } from '../../services/font-size';
import { TestingModule } from '../../tests';
import { ChartDoughnutIndicatorComponent } from './chart-doughnut-indicator.component';

describe(ChartDoughnutIndicatorComponent.name, () => {
  let component: ChartDoughnutIndicatorComponent;
  let fixture: ComponentFixture<ChartDoughnutIndicatorComponent>;
  let fontSizeService: FontSizeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDoughnutIndicatorComponent, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartDoughnutIndicatorComponent);
    fontSizeService = TestBed.inject(FontSizeService);
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
      QUANDO (@Input value) for array vazio.`, () => {
    component.value = [];
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

  it(`DEVE montar labels para o formatdo do Chartjs
      QUANDO (@Input value) for passado com as descrições.`, () => {
    const value: ChartDoughnutData[] = [
      {
        label: 'Label 1',
        value: 100,
      },
      {
        label: 'Label 2',
        value: 50,
      },
    ];

    const valueChanges = new SimpleChange(null, value, false);
    component.value = value;
    component.ngOnChanges({
      value: valueChanges,
    });
    fixture.detectChanges();

    const labels = component.doughnutChartData.labels;
    expect(labels?.[0]).toBe('Label 1');
    expect(labels?.[1]).toBe('Label 2');
  });

  it(`DEVE montar valores para o formatdo do Chartjs
      QUANDO (@Input value) for passado com os valores.`, () => {
    const value: ChartDoughnutData[] = [
      {
        label: 'Label 1',
        value: 100,
      },
      {
        label: 'Label 2',
        value: 50,
      },
    ];

    const valueChanges = new SimpleChange(null, value, false);
    component.value = value;
    component.ngOnChanges({
      value: valueChanges,
    });
    fixture.detectChanges();

    const data = component.doughnutChartData.datasets[0].data;
    expect(data[0]).toBe(100);
    expect(data[1]).toBe(50);
  });

  it(`DEVE alterar tamanho da fonte do título do tooltip para 32px
          QUANDO for alterado o tamanho da fonte da tela para 2rem.`, () => {
    fixture.detectChanges();

    fontSizeService.notifyFontSizeChange(2);
    const tituloTooltip = component.doughnutChartOptions?.plugins?.tooltip
      ?.titleFont as Partial<FontSpec>;
    expect(tituloTooltip?.size).toBe(32);
  });

  it(`DEVE alterar tamanho da fonte do corpo do tooltip para 32px
          QUANDO for alterado o tamanho da fonte da tela para 2rem.`, () => {
    fixture.detectChanges();

    fontSizeService.notifyFontSizeChange(2);
    const corpoTooltip = component.doughnutChartOptions?.plugins?.tooltip
      ?.bodyFont as Partial<FontSpec>;
    expect(corpoTooltip?.size).toBe(32);
  });

  it(`DEVE alterar tamanho da fonte do rodapé do tooltip para 32px
          QUANDO for alterado o tamanho da fonte da tela para 2rem.`, () => {
    fixture.detectChanges();

    fontSizeService.notifyFontSizeChange(2);
    const rodapeTooltip = component.doughnutChartOptions?.plugins?.tooltip
      ?.footerFont as Partial<FontSpec>;
    expect(rodapeTooltip?.size).toBe(32);
  });
});
