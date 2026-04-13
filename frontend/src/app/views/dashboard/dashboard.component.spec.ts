import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderService } from '../../components/template/header/header.service';
import { TestingModule } from '../../shared/tests';
import { DashboardComponent } from './dashboard.component';

describe(DashboardComponent.name, () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it(`DEVE renderizar o componente principal`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o cabeçalho com o link e com o nome de 'Dashboard'`, () => {
    fixture.detectChanges();
    const headerService = TestBed.inject(HeaderService);
    expect(headerService.headerData.title).toBe('Dashboard');
    expect(headerService.headerData.routeUrl).toBe('/dashboard');
  });

  it(`O componente de período do dashboard DEVE iniciar o dashboard no mês corrente.`, () => {
    fixture.detectChanges();
    const dataAtual = new Date();
    expect(component.dateMonthAnalysis.getDate()).toBe(dataAtual.getDate());
    expect(component.dateMonthAnalysis.getMonth()).toBe(dataAtual.getMonth());
    expect(component.dateMonthAnalysis.getFullYear()).toBe(
      dataAtual.getFullYear()
    );
  });

  it(`#${DashboardComponent.prototype.setMonthAnalysis} DEVE atualizar o filtro do dashboard para '05/2026'
      QUANDO chamado com a data '01/05/2026'.`, (done) => {
    fixture.detectChanges();
    const data = new Date(2026, 4, 1);
    const dummyDatepicker = {
      close: () => {
        expect(component.dateMonthAnalysis).toBe(data);
        expect(component.filters.ano).toBe(2026);
        expect(component.filters.mes).toBe(5);
        done();
      },
    } as any;

    component.setMonthAnalysis(data, dummyDatepicker);
  });
});
