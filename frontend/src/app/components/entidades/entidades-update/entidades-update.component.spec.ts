import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import {
  ENTIDADES_CRIADO_MOCK,
  ENTIDADES_FORM_CRIADO_MOCK,
} from '../mock/entidades-read-mock';
import { Entidades } from '../models/entidades.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';
import { EntidadesUpdateComponent } from './entidades-update.component';

describe(EntidadesUpdateComponent.name, () => {
  let fixture: ComponentFixture<EntidadesUpdateComponent>;
  let component: EntidadesUpdateComponent;
  let router: Router;
  let route: ActivatedRoute;
  let entidadesService: EntidadesService;
  let entidadesMapperService: EntidadesMapperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesUpdateComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadesUpdateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    entidadesService = TestBed.inject(EntidadesService);
    entidadesMapperService = TestBed.inject(EntidadesMapperService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar entidade
      QUANDO chamado com ID como parâmetro da URL.`, () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(entidadesService, 'readById').and.returnValue(
      new BehaviorSubject(ENTIDADES_CRIADO_MOCK).asObservable()
    );
    spyOn(entidadesMapperService, 'toForm').and.returnValue(
      ENTIDADES_FORM_CRIADO_MOCK
    );

    fixture.detectChanges();
    expect(component.entidades).toBe(ENTIDADES_FORM_CRIADO_MOCK);
  });

  it(`#${EntidadesUpdateComponent.prototype.updateEntidades.name} DEVE atualizar entidade
      QUANDO chamado.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'update').and.callFake((res) => {
      expect(res).toBe(ENTIDADES_CRIADO_MOCK);
      done();

      return new Observable<Entidades>();
    });

    fixture.detectChanges();
    component.updateEntidades();
  });

  it(`#${EntidadesUpdateComponent.prototype.updateEntidades.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a atualização da entidade ocorreu com sucesso.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'update').and.returnValue(
      new Observable<Entidades>((sub) => {
        sub.next(ENTIDADES_CRIADO_MOCK);
        sub.complete();
      })
    );

    spyOn(router, 'navigate');

    spyOn(entidadesService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Entidade atualizada com sucesso!');
      done();
    });

    fixture.detectChanges();
    component.updateEntidades();
  });

  it(`#${EntidadesUpdateComponent.prototype.updateEntidades.name} DEVE navegar para listagem de entidades
    QUANDO chamado e a atualização da entidade ocorreu com sucesso.`, (done) => {
    spyOn(entidadesMapperService, 'toAPI').and.returnValue(
      ENTIDADES_CRIADO_MOCK
    );

    spyOn(entidadesService, 'update').and.returnValue(
      new BehaviorSubject(ENTIDADES_CRIADO_MOCK).asObservable()
    );

    spyOn(entidadesService, 'showMessage');
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/entidades');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.updateEntidades();
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
