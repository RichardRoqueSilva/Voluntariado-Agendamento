import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../app.routes';
import { AgendamentosService } from '../../components/agendamentos/agendamentos.service';
import { HeaderService } from '../../components/template/header/header.service';
import { TestingModule } from '../../shared/tests';
import { AgendamentosCrudComponent } from './agendamentos-crud.component';
import { AGENDAMENTO_FORM_MOCK } from './mock/agendamento-form-mock';

describe(AgendamentosCrudComponent.name, () => {
  let fixture: ComponentFixture<AgendamentosCrudComponent>;
  let component: AgendamentosCrudComponent;
  let agendamentoService: AgendamentosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentosCrudComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentosCrudComponent);
    component = fixture.componentInstance;
    agendamentoService = TestBed.inject(AgendamentosService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o cabeçalho com o link e com o nome de 'Cadastro de Agendamentos'`, () => {
    const headerService = TestBed.inject(HeaderService);
    expect(headerService.headerData.title).toBe('Cadastro de Agendamentos');
    expect(headerService.headerData.routeUrl).toBe('/agendamentos');
  });

  it(`DEVE renderizar a listagem de entidades
     QUANDO carregar renderizar o componente principal`, () => {
    fixture.detectChanges();
    const listagem = fixture.debugElement.query(
      By.css('app-agendamentos-read')
    );

    expect(listagem).toBeTruthy();
  });

  it(`(D) DEVE exibir modal de agendamentos
     QUANDO clicar em botão de criação de agendamento.`, () => {
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-criar-agendamento'))
      .nativeElement as HTMLButtonElement;
    btn.click();

    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-modal-agendamento'));

    expect(component.mostrarModal).toBeTrue();
    expect(modal).toBeTruthy();
  });

  it(`(D) #${AgendamentosCrudComponent.prototype.fecharModal.name} DEVE ocultar modal de agendamentos
     QUANDO chamado.`, () => {
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-criar-agendamento'))
      .nativeElement as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    component.fecharModal();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-modal-agendamento'));

    expect(component.mostrarModal).toBeFalse();
    expect(modal).toBeFalsy();
  });

  it(`#${AgendamentosCrudComponent.prototype.salvarAgendamento.name} DEVE salvar o novo agendamento
     QUANDO chamado com os dados de agendamento.`, (done) => {
    spyOn(agendamentoService, 'create').and.callFake((agen) => {
      expect(agen.entidadeId).toBe(AGENDAMENTO_FORM_MOCK.entidadeId);
      expect(agen.diasVisita).toBe(AGENDAMENTO_FORM_MOCK.diasVisita);
      expect(agen.horario).toBe(AGENDAMENTO_FORM_MOCK.horario);
      expect(agen.status).toBe(AGENDAMENTO_FORM_MOCK.status);
      expect(agen.participantesIds[0]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[0]
      );
      expect(agen.participantesIds[1]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[1]
      );
      done();

      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    component.salvarAgendamento(AGENDAMENTO_FORM_MOCK);
  });

  it(`#${AgendamentosCrudComponent.prototype.salvarAgendamento.name} DEVE exibir mensagem de agendamento com sucesso
     QUANDO chamado com os dados de agendamento.`, (done) => {
    spyOn(agendamentoService, 'create').and.callFake((_) => {
      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    spyOn(agendamentoService, 'showMessage').and.callFake((mensagem) => {
      expect(mensagem).toBe('Agendamento realizado com sucesso');
      done();
    });
    component.salvarAgendamento(AGENDAMENTO_FORM_MOCK);
  });

  it(`#${AgendamentosCrudComponent.prototype.salvarAgendamento.name} DEVE exibir recarregar dados da listagem
     QUANDO chamado com os dados de agendamento.`, () => {
    spyOn(agendamentoService, 'create').and.callFake((_) => {
      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    const spy = spyOn(
      component.agentamentosReadComponent,
      'buscarAgendamentos'
    );
    component.salvarAgendamento(AGENDAMENTO_FORM_MOCK);
    expect(spy).toHaveBeenCalled();
  });
});
