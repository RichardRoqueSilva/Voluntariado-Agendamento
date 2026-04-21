import { TestBed } from '@angular/core/testing';

import { DashboardAccumulatedVisitsPerMonth } from '../models/dashboard-accumulated-visits';
import { DashboardResponseMapperService } from './dashboard-response-mapper.service';

describe(DashboardResponseMapperService.name, () => {
  let service: DashboardResponseMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardResponseMapperService);
  });

  it(`DEVE ser criado.`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${DashboardResponseMapperService.prototype.mapDashboardAcummulatedVisitsPerMonthToChartLine.name} DEVE converter objeto do backend para formato do gráfico de linhas
      QUANDO for chamado com objeto no formato do backend.`, () => {
    const dadoBackend: DashboardAccumulatedVisitsPerMonth[] = [
      {
        month: 'Janeiro',
        visitsPerDay: [
          {
            day: 1,
            visits: 10,
          },
        ],
      },
    ];

    const retorno =
      service.mapDashboardAcummulatedVisitsPerMonthToChartLine(dadoBackend);
    expect(retorno.xLabels[0]).toBe('1');
    expect(retorno.datasets[0].label).toBe('Janeiro');
    expect(retorno.datasets[0].yData[0]).toBe(10);
  });
});
