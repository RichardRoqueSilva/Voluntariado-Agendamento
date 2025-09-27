import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TestingModule } from '../../shared/tests';
import { AgendamentosService } from './agendamentos.service';
import {
  AGENDAMENTOS_AGENDAMENTO_MOCK,
  AGENDAMENTOS_FORM_AGENDAMENTO_MOCK,
  AGENDAMENTOS_READ_MOCK,
} from './mock/agendamentos-read-mock';

describe(AgendamentosService.name, () => {
  let service: AgendamentosService;
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [AgendamentosService],
    }).compileComponents();

    service = TestBed.inject(AgendamentosService);
    http = TestBed.inject(HttpClient);
    snackBar = TestBed.inject(MatSnackBar);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it(`DEVE ser criado.`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${AgendamentosService.prototype.showMessage.name} DEVE exibir mensagem de sucesso
    QUANDO for chamado apenas com mensagem.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-success');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de teste');
  });

  it(`#${AgendamentosService.prototype.showMessage.name} DEVE exibir mensagem de erro
    QUANDO for passado, como primeiro argumento, a mesagem de erro e ,como segundo argumento, true, indicado que é um erro.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de erro de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de erro de teste', true);
  });

  it(`#${AgendamentosService.prototype.errorHandler.name} DEVE chamar a exibição de mensagem de erro
    QUANDO chamado.`, (done) => {
    spyOn(service, 'showMessage').and.callFake((msg, isError) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect(isError).toBeTrue();
      done();
    });

    service.errorHandler(new Error());
  });

  it(`#${AgendamentosService.prototype.create.name} DEVE enviar requisição HTTP POST para /api/agendamentos
    QUANDO chamado com agendamento.`, (done) => {
    const agendamento = AGENDAMENTOS_FORM_AGENDAMENTO_MOCK;

    service.create(agendamento).subscribe((res) => {
      expect(res).toBe(AGENDAMENTOS_AGENDAMENTO_MOCK);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos`
    );

    expect(req.request.method).toBe('POST');
    req.flush(AGENDAMENTOS_AGENDAMENTO_MOCK);
  });

  it(`#${AgendamentosService.prototype.create.name} DEVE mostrar mensagem de erro
    QUANDO chamado com agendamento e ocorrer erro vindo do servidor.`, (done) => {
    spyOn(service, 'errorHandler').and.callFake((error) => {
      expect(error.status).toBe(404);
      expect(error.statusText).toBe('Not found');
      done();

      return new Observable();
    });

    const agendamento = AGENDAMENTOS_FORM_AGENDAMENTO_MOCK;
    service.create(agendamento).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos`
    );

    req.flush('Erro', { status: 404, statusText: 'Not found' });
  });

  it(`#${AgendamentosService.prototype.read.name} DEVE enviar requisição HTTP GET para /api/agendamentos
    QUANDO chamado.`, (done) => {
    const agendamentos = AGENDAMENTOS_READ_MOCK;

    service.read().subscribe((resAgendamento) => {
      expect(resAgendamento).toBe(agendamentos);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos`
    );

    expect(req.request.method).toBe('GET');
    req.flush(agendamentos);
  });

  it(`#${AgendamentosService.prototype.readById.name} DEVE enviar requisição HTTP GET para /api/agendamentos/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    service.readById('1').subscribe(() => {
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos/1`
    );

    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it(`#${AgendamentosService.prototype.update.name} DEVE enviar requisição HTTP PUT para /api/agendamentos/1
    QUANDO chamado com agendamento com ID igual a '1'.`, (done) => {
    const agendamento = AGENDAMENTOS_FORM_AGENDAMENTO_MOCK;
    service.update(1, agendamento).subscribe((res) => {
      expect(res.id).toBe(1);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos/1`
    );

    expect(req.request.method).toBe('PUT');
    req.flush({ id: 1 });
  });

  it(`#${AgendamentosService.prototype.delete.name} DEVE enviar requisição HTTP DELETE para /api/agendamentos/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    service.delete(1).subscribe((res) => {
      expect(res.id).toBe(1);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/agendamentos/1`
    );

    expect(req.request.method).toBe('DELETE');
    req.flush({ id: 1 });
  });
});
