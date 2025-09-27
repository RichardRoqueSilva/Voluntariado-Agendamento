import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { VOLUNTARIO_CRIADO_MOCK } from '../mock/voluntarios-read-mock';
import { Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';
import { VoluntariosDeleteComponent } from './voluntarios-delete.component';

describe(VoluntariosDeleteComponent.name, () => {
  let fixture: ComponentFixture<VoluntariosDeleteComponent>;
  let component: VoluntariosDeleteComponent;
  let router: Router;
  let route: ActivatedRoute;
  let voluntariosService: VoluntariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntariosDeleteComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntariosDeleteComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    voluntariosService = TestBed.inject(VoluntariosService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar o voluntário que será excluído
    QUANDO iniciar o componente.`, () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(voluntariosService, 'readById').and.returnValue(
      new BehaviorSubject(VOLUNTARIO_CRIADO_MOCK).asObservable()
    );

    fixture.detectChanges();

    expect(component.voluntarios).toBe(VOLUNTARIO_CRIADO_MOCK);
  });

  it(`#${VoluntariosDeleteComponent.prototype.cancel.name} DEVE navegar de volta para listagem de voluntários
    QUANDO chamado.`, (done) => {
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/voluntarios');
      done();

      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.cancel();
  });

  it(`#${VoluntariosDeleteComponent.prototype.deleteVoluntarios.name} DEVE excluir voluntário
    QUANDO chamado.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'delete').and.callFake((id) => {
      expect(id).toBe(1);
      done();

      return new Observable<Voluntarios>();
    });

    fixture.detectChanges();
    component.deleteVoluntarios();
  });

  it(`#${VoluntariosDeleteComponent.prototype.deleteVoluntarios.name} DEVE deletar voluntário de ID 0
    QUANDO chamado com voluntário sem ID.`, (done) => {
    component.voluntarios = { ...VOLUNTARIO_CRIADO_MOCK };
    delete component.voluntarios.id;

    spyOn(voluntariosService, 'delete').and.callFake((id) => {
      expect(id).toBe(0);
      done();

      return new Observable<Voluntarios>();
    });

    fixture.detectChanges();
    component.deleteVoluntarios();
  });

  it(`#${VoluntariosDeleteComponent.prototype.deleteVoluntarios.name} DEVE exibir mensagem de sucesso
    QUANDO chamado e a exclusão do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    const subject = new BehaviorSubject<any>(null);
    spyOn(voluntariosService, 'delete').and.returnValue(subject.asObservable());
    spyOn(voluntariosService, 'showMessage').and.callFake((msg) => {
      expect(msg).toBe('Voluntário excluido com sucesso!');
      done();
    });

    fixture.detectChanges();
    component.deleteVoluntarios();
  });

  it(`#${VoluntariosDeleteComponent.prototype.deleteVoluntarios.name} DEVE navegar para tela listagem de voluntários
    QUANDO chamado e a exclusão do voluntário ocorreu com sucesso.`, (done) => {
    component.voluntarios = VOLUNTARIO_CRIADO_MOCK;

    spyOn(voluntariosService, 'delete').and.returnValue(
      new BehaviorSubject<any>(null).asObservable()
    );
    spyOn(voluntariosService, 'showMessage').and.returnValue();
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/voluntarios');
      done();
      return new Promise((res) => res(true));
    });

    fixture.detectChanges();
    component.deleteVoluntarios();
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
