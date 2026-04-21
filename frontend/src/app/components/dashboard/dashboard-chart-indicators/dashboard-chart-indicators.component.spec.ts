import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { TestingModule } from '../../../shared/tests';
import { DashboardService } from '../services/dashboard.service';
import { DashboardChartIndicatorsComponent } from './dashboard-chart-indicators.component';

describe(DashboardChartIndicatorsComponent.name, () => {
  let component: DashboardChartIndicatorsComponent;
  let fixture: ComponentFixture<DashboardChartIndicatorsComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartIndicatorsComponent, TestingModule],
      providers: [DashboardService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardChartIndicatorsComponent);
    dashboardService = TestBed.inject(DashboardService);
    component = fixture.componentInstance;
  });

  it(`DEVE renderizar o componente principal.`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o componente visitas por entidade.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#visitas-por-entidade')).nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente visitas por voluntário.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#visitas-por-voluntario'))
        .nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente visitas acumuladas por dia nos últimos 3 meses.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('#visitas-acumuladas-por-dia-ultimos-3-meses')
      ).nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente visitas por período.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#visitas-por-periodo')).nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente visitas por dia da semana.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#visitas-por-dia-semana'))
        .nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente quantidade de voluntários que fizeram visitas no mês.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('#qtde-voluntarios-que-fizeram-visitas-no-mes')
      ).nativeElement
    ).toBeTruthy();
  });

  it(`DEVE renderizar o componente quantidade de entidades visitadas no mês.`, () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#qtde-entidades-visitadas-no-mes'))
        .nativeElement
    ).toBeTruthy();
  });
});
