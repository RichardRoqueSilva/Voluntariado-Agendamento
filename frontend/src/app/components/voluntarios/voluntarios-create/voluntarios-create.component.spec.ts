import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { VOLUNTARIO_CRIADO_MOCK } from '../mock/voluntarios-read-mock';
import { Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';
import { VoluntariosCreateComponent } from './voluntarios-create.component';

describe(VoluntariosCreateComponent.name, () => {
  let fixture: ComponentFixture<VoluntariosCreateComponent>;
  let component: VoluntariosCreateComponent;
  let router: Router;
  let route: ActivatedRoute;
  let voluntariosService: VoluntariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntariosCreateComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntariosCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    voluntariosService = TestBed.inject(VoluntariosService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${VoluntariosCreateComponent.prototype.createVoluntarios.name} DEVE criar voluntário
      QUANDO chamado.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'create').and.callFake((res) => {
      expect(res).toBe(VOLUNTARIO_CRIADO_MOCK);
      done();

      return new Observable<Voluntarios>();
    });

    fixture.detectChanges();
    component.createVoluntarios();
  });

  it(`#${VoluntariosCreateComponent.prototype.createVoluntarios.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a criação do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'create').and.returnValue(
      new Observable<Voluntarios>((sub) => {
        sub.next(VOLUNTARIO_CRIADO_MOCK);
        sub.complete();
      })
    );

    spyOn(router, 'navigate');
    spyOn(voluntariosService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Voluntário Cadastrado');
      done();
    });

    fixture.detectChanges();
    component.createVoluntarios();
  });

  it(`#${VoluntariosCreateComponent.prototype.createVoluntarios.name} DEVE navegar para listagem de voluntários
    QUANDO chamado e a criação do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'create').and.returnValue(
      new Observable<Voluntarios>((sub) => {
        sub.next(VOLUNTARIO_CRIADO_MOCK);
        sub.complete();
      })
    );

    spyOn(voluntariosService, 'showMessage');
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/voluntarios');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.createVoluntarios();
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
