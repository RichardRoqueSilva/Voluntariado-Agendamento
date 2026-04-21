import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { TestingModule } from '../../../shared/tests';
import { DashboardHorizontalChartBarData } from '../models';
import { DashboardAccumulatedVisitsPerMonth } from '../models/dashboard-accumulated-visits';
import { DashboardDoughnutData } from '../models/dashboard-doughnut-data';
import { DashboardVerticalChartBarData } from '../models/dashboard-vertical-chart-bar-data';
import { DashboardService } from './dashboard.service';

describe(DashboardService.name, () => {
  let service: DashboardService;
  let snackBar: MatSnackBar;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);
    snackBar = TestBed.inject(MatSnackBar);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it(`DEVE ser criado.`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${DashboardService.prototype.showMessage.name} DEVE exibir mensagem de sucesso
    QUANDO for chamado apenas com mensagem.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-success');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de teste');
  });

  it(`#${DashboardService.prototype.errorHandler.name} DEVE exibir mensagem de erro
    QUANDO for chamado apenas objeto de erro.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.errorHandler(new Error());
  });

  it(`#${DashboardService.prototype.filtroParaHttpParams.name} DEVE converter objeto de filtros para Query params
    QUANDO for chamado com os filtros do dashboard.`, () => {
    const queryParams = service.filtroParaHttpParams({
      ano: 2026,
      mes: 4,
    });

    expect(queryParams.get('ano')).toBe('2026');
    expect(queryParams.get('mes')).toBe('4');
  });

  it(`#${DashboardService.prototype.getQuantidadeEntidadesVisitadas.name} DEVE enviar requisição HTTP GET para /api/entidades/visitas/quantidades
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const qtdeEntidades = 50;

    service
      .getQuantidadeEntidadesVisitadas({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades).toBe(qtdeEntidades);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/visitas/quantidades?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(qtdeEntidades);
  });

  it(`#${DashboardService.prototype.getQuantidadeEntidadesVisitadas.name} DEVE exibir mensagem de erro
    QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getQuantidadeEntidadesVisitadas({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/visitas/quantidades?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    expect(req.request.method).toBe('GET');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosVisitas.name} DEVE enviar requisição HTTP GET para /api/voluntarios/visitas/quantidades
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const qtdeVoluntarios = 100;

    service
      .getQuantidadeVoluntariosVisitas({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades).toBe(qtdeEntidades);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas/quantidades?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(qtdeVoluntarios);
  });

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosVisitas.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getQuantidadeVoluntariosVisitas({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas/quantidades?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    expect(req.request.method).toBe('GET');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosNaoParticipantesVisitas.name} DEVE enviar requisição HTTP GET para /api/voluntarios/nao-participantes-visitas/quantidades
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const qtdeVoluntariosNaoParticipantes = 100;

    service
      .getQuantidadeVoluntariosNaoParticipantesVisitas({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades).toBe(qtdeEntidades);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/nao-participantes-visitas/quantidades?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(qtdeVoluntariosNaoParticipantes);
  });

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosNaoParticipantesVisitas.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service
      .getQuantidadeVoluntariosNaoParticipantesVisitas({ ano: 2026, mes: 4 })
      .subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/nao-participantes-visitas/quantidades?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    expect(req.request.method).toBe('GET');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getTaxaParticipacao.name} DEVE enviar requisição HTTP GET para /api/voluntarios/taxa-participacao
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const taxaParticipacao = 20.76;

    service
      .getTaxaParticipacao({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades).toBe(qtdeEntidades);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/taxa-participacao?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(taxaParticipacao);
  });

  it(`#${DashboardService.prototype.getTaxaParticipacao.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getTaxaParticipacao({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/taxa-participacao?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    expect(req.request.method).toBe('GET');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getHorasVisitas.name} DEVE enviar requisição HTTP GET para /api/voluntarios/visitas/totais/horas
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const horas = 20.76;

    service
      .getHorasVisitas({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades).toBe(qtdeEntidades);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas/totais/horas?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(horas);
  });

  it(`#${DashboardService.prototype.getHorasVisitas.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getHorasVisitas({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas/totais/horas?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getVisitasPorEntidade.name} DEVE enviar requisição HTTP GET para /api/entidades/visitas
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const retorno: DashboardHorizontalChartBarData[] = [
      {
        label: 'Label 1',
        value: 100,
      },
    ];

    service
      .getVisitasPorEntidade({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades[0].label).toBe('Label 1');
        expect(qtdeEntidades[0].value).toBe(100);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/visitas?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(retorno);
  });

  it(`#${DashboardService.prototype.getVisitasPorEntidade.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getVisitasPorEntidade({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/visitas?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getVisitasPorVoluntario.name} DEVE enviar requisição HTTP GET para /api/voluntarios/visitas
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const retorno: DashboardHorizontalChartBarData[] = [
      {
        label: 'Label 1',
        value: 100,
      },
    ];

    service
      .getVisitasPorVoluntario({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades[0].label).toBe('Label 1');
        expect(qtdeEntidades[0].value).toBe(100);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(retorno);
  });

  it(`#${DashboardService.prototype.getVisitasPorVoluntario.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getVisitasPorVoluntario({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/visitas?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getVisitasPorDiaDaSemana.name} DEVE enviar requisição HTTP GET para /api/dias-da-semana/visitas
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const retorno: DashboardVerticalChartBarData[] = [
      {
        label: 'Segunda',
        value: 100,
      },
    ];

    service
      .getVisitasPorDiaDaSemana({ ano: 2026, mes: 4 })
      .subscribe((qtdeEntidades) => {
        expect(qtdeEntidades[0].label).toBe('Segunda');
        expect(qtdeEntidades[0].value).toBe(100);
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias-da-semana/visitas?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(retorno);
  });

  it(`#${DashboardService.prototype.getVisitasPorDiaDaSemana.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getVisitasPorDiaDaSemana({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias-da-semana/visitas?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getVisitasAcumuladasPorDiaUltimos3Meses.name} DEVE enviar requisição HTTP GET para /api/dias/visitas/ultimos/3/meses
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const retorno: DashboardAccumulatedVisitsPerMonth[] = [
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

    service
      .getVisitasAcumuladasPorDiaUltimos3Meses({ ano: 2026, mes: 4 })
      .subscribe((r) => {
        expect(r.xLabels[0]).toBe('1');
        expect(r.datasets[0].yData[0]).toBe(10);
        expect(r.datasets[0].label).toBe('Janeiro');
        done();
      });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias/visitas/ultimos/3/meses?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(retorno);
  });

  it(`#${DashboardService.prototype.getVisitasAcumuladasPorDiaUltimos3Meses.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service
      .getVisitasAcumuladasPorDiaUltimos3Meses({ ano: 2026, mes: 4 })
      .subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias/visitas/ultimos/3/meses?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });

  it(`#${DashboardService.prototype.getVisitasPorPeriodo.name} DEVE enviar requisição HTTP GET para /api/dias/visitas/periodo
      QUANDO chamado com filtros do dashboard.`, (done) => {
    const retorno: DashboardDoughnutData[] = [
      {
        label: 'Manhã',
        value: 57,
      },
      {
        label: 'Tarde',
        value: 9,
      },
      {
        label: 'Noite',
        value: 231,
      },
    ];

    service.getVisitasPorPeriodo({ ano: 2026, mes: 4 }).subscribe((r) => {
      expect(r[0].label).toBe('Manhã');
      expect(r[0].value).toBe(57);
      expect(r[1].label).toBe('Tarde');
      expect(r[1].value).toBe(9);
      expect(r[2].label).toBe('Noite');
      expect(r[2].value).toBe(231);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias/visitas/periodo?ano=2026&mes=4`
    );

    expect(req.request.method).toBe('GET');
    req.flush(retorno);
  });

  it(`#${DashboardService.prototype.getVisitasPorPeriodo.name} DEVE exibir mensagem de erro
      QUANDO ocorrer erro de chamada remota.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.getVisitasPorPeriodo({ ano: 2026, mes: 4 }).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/dias/visitas/periodo?ano=2026&mes=4`
    );

    const error = new ProgressEvent('error');
    req.error(error);
  });
});
