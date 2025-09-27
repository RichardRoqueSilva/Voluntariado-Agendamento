import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { VOLUNTARIO_CRIADO_MOCK } from '../mock/voluntarios-read-mock';
import { Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';
import { VoluntariosUpdateComponent } from './voluntarios-update.component';

describe(VoluntariosUpdateComponent.name, () => {
  let fixture: ComponentFixture<VoluntariosUpdateComponent>;
  let component: VoluntariosUpdateComponent;
  let router: Router;
  let route: ActivatedRoute;
  let voluntariosService: VoluntariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntariosUpdateComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntariosUpdateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    voluntariosService = TestBed.inject(VoluntariosService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar voluntário
    QUANDO chamado com ID como parâmetro da URL.`, () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(voluntariosService, 'readById').and.returnValue(
      new BehaviorSubject(VOLUNTARIO_CRIADO_MOCK).asObservable()
    );

    fixture.detectChanges();
    expect(component.voluntarios).toBe(VOLUNTARIO_CRIADO_MOCK);
  });

  it(`#${VoluntariosUpdateComponent.prototype.updateVoluntarios.name} DEVE atualizar voluntário
      QUANDO chamado.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'update').and.callFake((res) => {
      expect(res).toBe(VOLUNTARIO_CRIADO_MOCK);
      done();

      return new Observable<Voluntarios>();
    });

    fixture.detectChanges();
    component.updateVoluntarios();
  });

  it(`#${VoluntariosUpdateComponent.prototype.updateVoluntarios.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a atualização do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'update').and.returnValue(
      new BehaviorSubject(VOLUNTARIO_CRIADO_MOCK)
    );

    spyOn(router, 'navigate');
    spyOn(voluntariosService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Voluntário atualizado com sucesso!');
      done();
    });

    fixture.detectChanges();
    component.updateVoluntarios();
  });

  it(`#${VoluntariosUpdateComponent.prototype.updateVoluntarios.name} DEVE navegar para listagem de voluntários
    QUANDO chamado e a atualização do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'update').and.returnValue(
      new BehaviorSubject(VOLUNTARIO_CRIADO_MOCK)
    );

    spyOn(voluntariosService, 'showMessage');
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/voluntarios');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.updateVoluntarios();
  });

  it(`(D) DEVE navegar de volta para listagem de voluntários
    QUANDO clicar no botão de cancelar.`, (done) => {
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/voluntarios');
      done();

      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    const btnCancelar = fixture.debugElement.query(By.css('#btn-cancelar'))
      .nativeElement as HTMLButtonElement;
    btnCancelar.click();
  });
});
