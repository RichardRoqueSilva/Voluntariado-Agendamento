import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TestingModule } from '../../../shared/tests';
import { DashboardService } from '../services/dashboard.service';
import { DashboardSimpleIndicatorsComponent } from './dashboard-simple-indicators.component';

describe(DashboardSimpleIndicatorsComponent.name, () => {
  let component: DashboardSimpleIndicatorsComponent;
  let fixture: ComponentFixture<DashboardSimpleIndicatorsComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSimpleIndicatorsComponent, TestingModule],
      providers: [DashboardService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSimpleIndicatorsComponent);
    dashboardService = TestBed.inject(DashboardService);
    component = fixture.componentInstance;
  });

  it(`DEVE renderizar o componente principal.`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`(D) DEVE buscar os dados de quantidade de entidades visitadas e exibir seu número
      QUANDO ocorrer mudança da propriedade (@Input filters).`, () => {
    spyOn(dashboardService, 'getQuantidadeEntidadesVisitadas').and.returnValue(
      of(50)
    );

    const filters = {
      ano: 2026,
      mes: 4,
    };

    component.filters = filters;

    const filterChange = new SimpleChange(null, filters, true);
    component.ngOnChanges({
      filters: filterChange,
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('#qtdeEntidadesVisitadas'))
      .nativeElement as HTMLElement;
    expect(el.textContent).toContain('50');
  });

  it(`(D) DEVE buscar os dados de quantidade de voluntários que realizaram visitadas e exibir seu número
      QUANDO ocorrer mudança da propriedade (@Input filters).`, () => {
    spyOn(dashboardService, 'getQuantidadeVoluntariosVisitas').and.returnValue(
      of(70)
    );

    const filters = {
      ano: 2026,
      mes: 4,
    };

    component.filters = filters;

    const filterChange = new SimpleChange(null, filters, true);
    component.ngOnChanges({
      filters: filterChange,
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('#qtdeParticipantesVisitas'))
      .nativeElement as HTMLElement;
    expect(el.textContent).toContain('70');
  });

  it(`(D) DEVE buscar os dados de quantidade de voluntários que não participaram de visitadas e exibir seu número
      QUANDO ocorrer mudança da propriedade (@Input filters).`, () => {
    spyOn(
      dashboardService,
      'getQuantidadeVoluntariosNaoParticipantesVisitas'
    ).and.returnValue(of(10));

    const filters = {
      ano: 2026,
      mes: 4,
    };

    component.filters = filters;

    const filterChange = new SimpleChange(null, filters, true);
    component.ngOnChanges({
      filters: filterChange,
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css('#qtdeNaoParticipantesVisitas')
    ).nativeElement as HTMLElement;
    expect(el.textContent).toContain('10');
  });

  it(`(D) DEVE buscar os dados de taxa de participação e exibir seu número
      QUANDO ocorrer mudança da propriedade (@Input filters).`, () => {
    spyOn(dashboardService, 'getTaxaParticipacao').and.returnValue(of(0.5789));

    const filters = {
      ano: 2026,
      mes: 4,
    };

    component.filters = filters;

    const filterChange = new SimpleChange(null, filters, true);
    component.ngOnChanges({
      filters: filterChange,
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('#taxaParticipacao'))
      .nativeElement as HTMLElement;
    expect(el.textContent).toContain('57,89%');
  });

  it(`(D) DEVE buscar os dados de horas de visitas e exibir seu número
      QUANDO ocorrer mudança da propriedade (@Input filters).`, () => {
    spyOn(dashboardService, 'getHorasVisitas').and.returnValue(of(79_777_000));

    const filters = {
      ano: 2026,
      mes: 4,
    };

    component.filters = filters;

    const filterChange = new SimpleChange(null, filters, true);
    component.ngOnChanges({
      filters: filterChange,
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('#horasVisitas'))
      .nativeElement as HTMLElement;
    expect(el.textContent).toContain('22:09:37');
  });
});
