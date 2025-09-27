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
import { EntidadesDeleteComponent } from './entidades-delete.component';

describe(EntidadesDeleteComponent.name, () => {
  let fixture: ComponentFixture<EntidadesDeleteComponent>;
  let component: EntidadesDeleteComponent;
  let router: Router;
  let route: ActivatedRoute;
  let entidadesService: EntidadesService;
  let entidadeMapperService: EntidadesMapperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesDeleteComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadesDeleteComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    entidadesService = TestBed.inject(EntidadesService);
    entidadeMapperService = TestBed.inject(EntidadesMapperService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar o voluntário que será excluído
    QUANDO iniciar o componente.`, () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(entidadeMapperService, 'toForm').and.returnValue(
      ENTIDADES_FORM_CRIADO_MOCK
    );
    spyOn(entidadesService, 'readById').and.returnValue(
      new BehaviorSubject(ENTIDADES_CRIADO_MOCK).asObservable()
    );

    fixture.detectChanges();

    expect(component.entidades).toBe(ENTIDADES_FORM_CRIADO_MOCK);
  });

  it(`#${EntidadesDeleteComponent.prototype.cancel.name} DEVE navegar de volta para listagem de entidades
    QUANDO chamado.`, (done) => {
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/entidades');
      done();

      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.cancel();
  });

  it(`#${EntidadesDeleteComponent.prototype.deleteEntidades.name} DEVE excluir entidade
    QUANDO chamado.`, (done) => {
    component.entidades = ENTIDADES_FORM_CRIADO_MOCK;

    spyOn(entidadesService, 'delete').and.callFake((id) => {
      expect(id).toBe(1);
      done();

      return new Observable<Entidades>();
    });

    fixture.detectChanges();
    component.deleteEntidades();
  });

  it(`#${EntidadesDeleteComponent.prototype.deleteEntidades.name} DEVE deletar entidade de ID 0
    QUANDO chamado com entidade sem ID.`, (done) => {
    component.entidades = { ...ENTIDADES_FORM_CRIADO_MOCK };
    delete component.entidades.id;

    spyOn(entidadesService, 'delete').and.callFake((id) => {
      expect(id).toBe(0);
      done();

      return new Observable<Entidades>();
    });

    fixture.detectChanges();
    component.deleteEntidades();
  });

  it(`#${EntidadesDeleteComponent.prototype.deleteEntidades.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a exclusão da entidade ocorreu com sucesso.`, (done) => {
    component.entidades = ENTIDADES_FORM_CRIADO_MOCK;

    const subject = new BehaviorSubject<any>(null);
    spyOn(entidadesService, 'delete').and.returnValue(subject.asObservable());
    spyOn(entidadesService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Entidade excluida com sucesso!');
      done();
    });

    fixture.detectChanges();
    component.deleteEntidades();
  });

  it(`#${EntidadesDeleteComponent.prototype.deleteEntidades.name} DEVE navegar para tela de listagem de entidades
    QUANDO chamado e a exclusão da entidade ocorreu com sucesso.`, (done) => {
    component.entidades = ENTIDADES_FORM_CRIADO_MOCK;

    spyOn(entidadesService, 'delete').and.returnValue(
      new BehaviorSubject<any>(null).asObservable()
    );
    spyOn(entidadesService, 'showMessage').and.returnValue();
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/entidades');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.deleteEntidades();
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
