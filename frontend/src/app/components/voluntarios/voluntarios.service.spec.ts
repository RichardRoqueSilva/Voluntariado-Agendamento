import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TestingModule } from '../../shared/tests';
import { VOLUNTARIO_CRIADO_MOCK } from './mock/voluntarios-read-mock';
import { VoluntariosService } from './voluntarios.service';

describe(VoluntariosService.name, () => {
  let service: VoluntariosService;
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [VoluntariosService],
    }).compileComponents();

    service = TestBed.inject(VoluntariosService);
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

  it(`#${VoluntariosService.prototype.showMessage.name} DEVE exibir mensagem de sucesso
    QUANDO for chamado apenas com mensagem.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-success');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de teste');
  });

  it(`#${VoluntariosService.prototype.showMessage.name} DEVE exibir mensagem de erro
    QUANDO for passado, como primeiro argumento, a mesagem de erro e ,como segundo argumento, true, indicado que é um erro.`, (done) => {
    spyOn(snackBar, 'open').and.callFake((msg, _, opcoes) => {
      expect(msg).toBe('Mensagem de erro de teste');
      expect((<string[]>opcoes?.panelClass)[0]).toBe('msg-error');
      done();

      return null as any;
    });

    service.showMessage('Mensagem de erro de teste', true);
  });

  it(`#${VoluntariosService.prototype.errorHandler.name} DEVE chamar a exibição de mensagem de erro
    QUANDO chamado.`, (done) => {
    spyOn(service, 'showMessage').and.callFake((msg, isError) => {
      expect(msg).toBe('Ocorreu um erro!');
      expect(isError).toBeTrue();
      done();
    });

    service.errorHandler(new Error());
  });

  it(`#${VoluntariosService.prototype.create.name} DEVE enviar requisição HTTP POST para /api/voluntarios
    QUANDO chamado com voluntário.`, (done) => {
    const voluntario = { ...VOLUNTARIO_CRIADO_MOCK };
    delete voluntario.id;

    service.create(voluntario).subscribe((resVoluntario) => {
      expect(resVoluntario).toBe(voluntario);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios`
    );

    expect(req.request.method).toBe('POST');
    req.flush(voluntario);
  });

  it(`#${VoluntariosService.prototype.create.name} DEVE mostrar mensagem de erro
    QUANDO chamado com voluntário e ocorrer erro vindo do servidor.`, (done) => {
    spyOn(service, 'errorHandler').and.callFake((error) => {
      expect(error.status).toBe(404);
      expect(error.statusText).toBe('Not found');
      done();

      return new Observable();
    });

    const voluntario = { ...VOLUNTARIO_CRIADO_MOCK };
    delete voluntario.id;
    service.create(voluntario).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios`
    );

    req.flush('Erro', { status: 404, statusText: 'Not found' });
  });

  it(`#${VoluntariosService.prototype.read.name} DEVE enviar requisição HTTP GET para /api/voluntarios
    QUANDO chamado.`, (done) => {
    const voluntarios = [VOLUNTARIO_CRIADO_MOCK];

    service.read().subscribe((resVoluntario) => {
      expect(resVoluntario).toBe(voluntarios);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios`
    );

    expect(req.request.method).toBe('GET');
    req.flush(voluntarios);
  });

  it(`#${VoluntariosService.prototype.readById.name} DEVE enviar requisição HTTP GET para /api/voluntarios/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    service.readById('1').subscribe((resVoluntario) => {
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/1`
    );

    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it(`#${VoluntariosService.prototype.update.name} DEVE enviar requisição HTTP PUT para /api/voluntarios/1
    QUANDO chamado com voluntário com ID igual a '1'.`, (done) => {
    const voluntario = VOLUNTARIO_CRIADO_MOCK;
    service.update(voluntario).subscribe((resVoluntario) => {
      expect(resVoluntario).toBe(voluntario);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/1`
    );

    expect(req.request.method).toBe('PUT');
    req.flush(voluntario);
  });

  it(`#${VoluntariosService.prototype.delete.name} DEVE enviar requisição HTTP DELETE para /api/voluntarios/1
    QUANDO chamado com ID igual a '1'.`, (done) => {
    const voluntario = VOLUNTARIO_CRIADO_MOCK;
    service.delete(1).subscribe((resVoluntario) => {
      expect(resVoluntario).toBe(voluntario);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.baseApiUrl}/api/voluntarios/1`
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(voluntario);
  });
});
