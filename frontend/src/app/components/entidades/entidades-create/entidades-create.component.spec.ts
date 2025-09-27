import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { ENTIDADES_CRIADO_MOCK } from '../mock/entidades-read-mock';
import { Entidades } from '../models/entidades.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';
import { EntidadesCreateComponent } from './entidades-create.component';

describe(EntidadesCreateComponent.name, () => {
  let fixture: ComponentFixture<EntidadesCreateComponent>;
  let component: EntidadesCreateComponent;
  let router: Router;
  let route: ActivatedRoute;
  let entidadesService: EntidadesService;
  let entidadesMapperService: EntidadesMapperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesCreateComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadesCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    entidadesService = TestBed.inject(EntidadesService);
    entidadesMapperService = TestBed.inject(EntidadesMapperService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${EntidadesCreateComponent.prototype.createEntidades.name} DEVE criar entidade
      QUANDO chamado.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'create').and.callFake((res) => {
      expect(res).toBe(ENTIDADES_CRIADO_MOCK);
      done();

      return new Observable<Entidades>();
    });

    fixture.detectChanges();
    component.createEntidades();
  });

  it(`#${EntidadesCreateComponent.prototype.createEntidades.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a criação da entidade ocorreu com sucesso.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'create').and.returnValue(
      new Observable<Entidades>((sub) => {
        sub.next(ENTIDADES_CRIADO_MOCK);
        sub.complete();
      })
    );

    spyOn(router, 'navigate');

    spyOn(entidadesService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Entidade Cadastrada');
      done();
    });

    fixture.detectChanges();
    component.createEntidades();
  });

  it(`#${EntidadesCreateComponent.prototype.createEntidades.name} DEVE navegar para listagem de entidades
    QUANDO chamado e a criação do entidade ocorreu com sucesso.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'create').and.returnValue(
      new Observable<Entidades>((sub) => {
        sub.next(ENTIDADES_CRIADO_MOCK);
        sub.complete();
      })
    );

    spyOn(entidadesService, 'showMessage');
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/entidades');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.createEntidades();
  });

  it(`(D) DEVE navegar de volta para listagem de entidades
    QUANDO clicar no botão de cancelar.`, (done) => {
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/entidades');
      done();

      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    const btnCancelar = fixture.debugElement.query(By.css('#btn-cancelar'))
      .nativeElement as HTMLButtonElement;
    btnCancelar.click();
  });
});
