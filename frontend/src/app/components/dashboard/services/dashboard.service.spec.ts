import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { TestingModule } from '../../../shared/tests';
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

  it(`#${DashboardService.prototype.getQuantidadeEntidadesVisitadas} DEVE enviar requisição HTTP GET para /api/entidades/visitas/quantidades
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

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosVisitas} DEVE enviar requisição HTTP GET para /api/voluntarios/visitas/quantidades
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

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosVisitas} DEVE exibir mensagem de erro
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

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosNaoParticipantesVisitas} DEVE enviar requisição HTTP GET para /api/voluntarios/nao-participantes-visitas/quantidades
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

  it(`#${DashboardService.prototype.getQuantidadeVoluntariosNaoParticipantesVisitas} DEVE exibir mensagem de erro
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

  it(`#${DashboardService.prototype.getTaxaParticipacao} DEVE enviar requisição HTTP GET para /api/voluntarios/taxa-participacao
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

  it(`#${DashboardService.prototype.getTaxaParticipacao} DEVE exibir mensagem de erro
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

  it(`#${DashboardService.prototype.getHorasVisitas} DEVE enviar requisição HTTP GET para /api/voluntarios/visitas/totais/horas
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

  it(`#${DashboardService.prototype.getHorasVisitas} DEVE exibir mensagem de erro
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
});
