import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TestingModule } from '../../../shared/tests';
import { ENTIDADES_CRIADO_MOCK } from '../mock/entidades-read-mock';
import { EntidadesService } from './entidades.service';

describe(EntidadesService.name, () => {
  let service: EntidadesService;
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [EntidadesService],
    }).compileComponents();

    service = TestBed.inject(EntidadesService);
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

  it(`#${EntidadesService.prototype.showMessage.name} DEVE exibir mensagem de sucesso
    QUANDO for chamado apenas com mensagem.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-success');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de teste');
  });

  it(`#${EntidadesService.prototype.showMessage.name} DEVE exibir mensagem de erro
    QUANDO for passado, como primeiro argumento, a mesagem de erro e ,como segundo argumento, true, indicado que é um erro.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de erro de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de erro de teste', true);
  });

  it(`#${EntidadesService.prototype.errorHandler.name} DEVE chamar a exibição de mensagem de erro
    QUANDO chamado.`, (done) => {
    spyOn(service, 'showMessage').and.callFake((msg, isError) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect(isError).toBeTrue();
      done();
    });

    service.errorHandler(new Error());
  });

  it(`#${EntidadesService.prototype.create.name} DEVE enviar requisição HTTP POST para /api/entidades
    QUANDO chamado com entidade.`, (done) => {
    const entidade = { ...ENTIDADES_CRIADO_MOCK };
    delete entidade.id;

    service.create(entidade).subscribe((resEntidade) => {
      expect(resEntidade).toBe(entidade);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades`
    );

    expect(req.request.method).toBe('POST');
    req.flush(entidade);
  });

  it(`#${EntidadesService.prototype.create.name} DEVE mostrar mensagem de erro
    QUANDO chamado com entidade e ocorrer erro vindo do servidor.`, (done) => {
    spyOn(service, 'errorHandler').and.callFake((error) => {
      expect(error.status).toBe(404);
      expect(error.statusText).toBe('Not found');
      done();

      return new Observable();
    });

    const entidade = { ...ENTIDADES_CRIADO_MOCK };
    delete entidade.id;
    service.create(entidade).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades`
    );

    req.flush('Erro', { status: 404, statusText: 'Not found' });
  });

  it(`#${EntidadesService.prototype.read.name} DEVE enviar requisição HTTP GET para /api/entidades
    QUANDO chamado.`, (done) => {
    const entidade = [ENTIDADES_CRIADO_MOCK];

    service.read().subscribe((resEntidade) => {
      expect(resEntidade).toBe(entidade);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades`
    );

    expect(req.request.method).toBe('GET');
    req.flush(entidade);
  });

  it(`#${EntidadesService.prototype.readById.name} DEVE enviar requisição HTTP GET para /api/entidades/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    service.readById('1').subscribe((resEntidade) => {
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/1`
    );

    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it(`#${EntidadesService.prototype.update.name} DEVE enviar requisição HTTP PUT para /api/entidades/1
    QUANDO chamado com entidade com ID igual a '1'.`, (done) => {
    const entidade = ENTIDADES_CRIADO_MOCK;
    service.update(entidade).subscribe((resEntidade) => {
      expect(resEntidade).toBe(entidade);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/1`
    );

    expect(req.request.method).toBe('PUT');
    req.flush(entidade);
  });

  it(`#${EntidadesService.prototype.delete.name} DEVE enviar requisição HTTP DELETE para /api/entidades/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    const entidade = ENTIDADES_CRIADO_MOCK;
    service.delete(1).subscribe((resEntidade) => {
      expect(resEntidade).toBe(entidade);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/entidades/1`
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(entidade);
  });
});
