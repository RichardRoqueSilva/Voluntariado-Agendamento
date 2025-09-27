import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TestingModule } from '../../../shared/tests';
import { DiaSemanaType } from '../../entidades/models/dia-semana-type.model';
import { EntidadesService } from '../../entidades/services/entidades.service';
import { VOLUNTARIOS_READ_MOCK } from '../../voluntarios/mock/voluntarios-read-mock';
import {
  VoluntarioRole,
  Voluntarios,
} from '../../voluntarios/voluntarios.model';
import { VoluntariosService } from '../../voluntarios/voluntarios.service';
import { AGENDAMENTOS_AGENDAMENTO_MOCK } from '../mock/agendamentos-read-mock';
import { ModalAgendamentoModoType } from '../models/modal-agendamento.model';
import { StatusAgendamento } from '../models/status-agendamento-type.model';
import { ENTIDADES_READ_MOCK } from './../../entidades/mock/entidades-read-mock';
import { ModalAgendamentoComponent } from './modal-agendamento.component';

describe(ModalAgendamentoComponent.name, () => {
  let fixture: ComponentFixture<ModalAgendamentoComponent>;
  let component: ModalAgendamentoComponent;
  let entidadesService: EntidadesService;
  let voluntariosService: VoluntariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgendamentoComponent, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAgendamentoComponent);
    component = fixture.componentInstance;
    entidadesService = TestBed.inject(EntidadesService);
    voluntariosService = TestBed.inject(VoluntariosService);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar listagem de entidades e de voluntários
    QUANDO componente foi iniciado.`, () => {
    const entidades = ENTIDADES_READ_MOCK;
    const voluntarios = VOLUNTARIOS_READ_MOCK;

    const spyReceberDados = spyOn(component, 'receberDados');
    spyOn(entidadesService, 'read').and.returnValue(
      new BehaviorSubject(entidades).asObservable()
    );
    spyOn(voluntariosService, 'read').and.returnValue(
      new BehaviorSubject(voluntarios).asObservable()
    );

    fixture.detectChanges();

    expect(spyReceberDados).toHaveBeenCalled();
    expect(component.entidades).toBe(entidades);
    expect(component.voluntarios).toBe(voluntarios);
    expect(component.participantes[0]).toBe('Nome');
  });

  it(`DEVE atualizar titulo do modal para 'Editar Agendamento'
    QUANDO (@Input ${ModalAgendamentoComponent.prototype.modo}) for alterado para '${ModalAgendamentoModoType.EDICAO}'.`, () => {
    spyOn(component, 'ngOnInit');

    fixture.detectChanges();

    component.modo = ModalAgendamentoModoType.EDICAO;
    const modoChange = new SimpleChange(
      null,
      ModalAgendamentoModoType.EDICAO,
      true
    );

    component.ngOnChanges({
      modo: modoChange,
    });

    expect(component.titulo).toBe('Editar Agendamento');
  });

  it(`#${ModalAgendamentoComponent.prototype.onFechar.name} DEVE emitir evento (@Output fechar)
    QUANDO chamado.`, (done) => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();

    component.fechar.subscribe(() => {
      expect().nothing();
      done();
    });

    component.onFechar();
  });

  it(`DEVE atualizar entidade selecionada
    QUANDO campo 'entidadeId' do formulário for alterado.`, () => {
    spyOn(component, 'ngOnInit');

    fixture.detectChanges();

    const entidades = ENTIDADES_READ_MOCK;
    component.entidades = entidades;

    component.agendamentoForm.patchValue({
      entidadeId: 1,
    });

    expect(component.entidadeSelecionada).toBe(entidades[0]);
  });

  it(`#${ModalAgendamentoComponent.prototype.getDiasSemanaValidosEntidade.name} DEVE retornar os dias de visita da entidade, separados por vígula
    QUANDO chamado, possuindo uma entidade selecionada no campo 'Entidade'.`, () => {
    spyOn(component, 'ngOnInit');

    fixture.detectChanges();

    const entidades = ENTIDADES_READ_MOCK;
    component.entidades = entidades;

    component.agendamentoForm.patchValue({
      entidadeId: 1,
    });

    expect(component.getDiasSemanaValidosEntidade()).toBe(
      `${DiaSemanaType.SEGUNDA.descricao}, ${DiaSemanaType.TERCA.descricao}`
    );
  });

  it(`#${ModalAgendamentoComponent.prototype.onSalvar.name} DEVE emitir evento (@Output salvar) com os dados do agendamento
    QUANDO chamado.`, (done) => {
    spyOn(component, 'ngOnInit');

    const entidades = ENTIDADES_READ_MOCK;
    const voluntarios = VOLUNTARIOS_READ_MOCK;

    spyOn(entidadesService, 'read').and.returnValue(
      new BehaviorSubject(entidades).asObservable()
    );
    spyOn(voluntariosService, 'read').and.returnValue(
      new BehaviorSubject(voluntarios).asObservable()
    );

    component.agendamento = AGENDAMENTOS_AGENDAMENTO_MOCK;

    const agendamentoChange = new SimpleChange(
      null,
      AGENDAMENTOS_AGENDAMENTO_MOCK,
      true
    );

    component.ngOnChanges({
      agendamento: agendamentoChange,
    });

    fixture.detectChanges();

    component.salvar.subscribe((agendamento) => {
      expect(agendamento.entidadeId).toBe(1);
      expect(agendamento.diasVisita).toBe('2025-09-26');
      expect(agendamento.horario).toBe('13:30:00');
      expect(agendamento.participantesIds[0]).toBe(1);
      expect(agendamento.participantesIds[1]).toBe(2);
      expect(agendamento.status).toBe(StatusAgendamento.CONFIRMADO);
      done();
    });

    component.onSalvar();
  });

  it(`#${ModalAgendamentoComponent.prototype.adicionarParticipante.name} DEVE adicionar novo participante
    QUANDO chamado com o campo de 'Participante' preenchido.`, () => {
    fixture.detectChanges();

    const mockVoluntario: Voluntarios = {
      id: 2,
      celular: '',
      email: '',
      login: '',
      nome: '',
      observacao: '',
      role: VoluntarioRole.USER,
      senha: '',
    };
    component.voluntarios = [mockVoluntario];
    component.agendamentoForm.patchValue({
      participanteSelecionado: 2,
    });

    component.adicionarParticipante();

    expect(component.participantesSelecionados[0]).toBe(mockVoluntario);
  });

  it(`#${ModalAgendamentoComponent.prototype.removerParticipante.name} DEVE remover participante
    QUANDO for passado como argumento, o índice do participante que será removido.`, () => {
    fixture.detectChanges();

    const mockVoluntario: Voluntarios = {
      id: 2,
      celular: '',
      email: '',
      login: '',
      nome: '',
      observacao: '',
      role: VoluntarioRole.USER,
      senha: '',
    };
    component.participantesSelecionados = [mockVoluntario];

    component.removerParticipante(0);

    expect(component.participantesSelecionados.length).toBe(0);
  });
});
