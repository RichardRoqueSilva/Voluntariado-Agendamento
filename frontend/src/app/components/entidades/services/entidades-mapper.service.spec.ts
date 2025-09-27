import { TestBed } from '@angular/core/testing';
import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { Entidades } from '../models/entidades.model';
import { EntidadesMapperService } from './entidades-mapper.service';

describe(EntidadesMapperService.name, () => {
  let service: EntidadesMapperService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EntidadesMapperService],
    }).compileComponents();

    service = TestBed.inject(EntidadesMapperService);
  });

  it(`#${EntidadesMapperService.prototype.toAPI.name} DEVE mapear objeto que está no formato que o formulário de cadastro para o formato que a API aceita QUANDO chamado com objeto do formulário de cadastro de entidades.`, () => {
    const dataHorarioInicioVisita = new Date();
    dataHorarioInicioVisita.setHours(12, 30, 0);

    const dataHorarioFimVisita = new Date();
    dataHorarioFimVisita.setHours(18, 30, 0);

    const formatoFormulario: EntidadesFormModel = {
      id: 1,
      endereco: 'Endereço teste',
      nome: 'Nome teste',
      responsavel: 'Responsável teste',
      telefone: '99999999999',
      diasVisita: [
        DiaSemanaType.SEGUNDA.descricao,
        DiaSemanaType.TERCA.descricao,
      ],
      horarioInicioVisita: dataHorarioInicioVisita,
      horarioFimVisita: dataHorarioFimVisita,
    };

    const formatoAPI: Entidades = service.toAPI(formatoFormulario);

    expect(formatoAPI.id).toBe(1);
    expect(formatoAPI.endereco).toBe('Endereço teste');
    expect(formatoAPI.nome).toBe('Nome teste');
    expect(formatoAPI.responsavel).toBe('Responsável teste');
    expect(formatoAPI.telefone).toBe('99999999999');
    expect(formatoAPI.diasVisita[0]).toBe(DiaSemanaType.SEGUNDA.descricao);
    expect(formatoAPI.diasVisita[1]).toBe(DiaSemanaType.TERCA.descricao);
    expect(formatoAPI.horarioInicioVisita).toBe('12:30:00');
    expect(formatoAPI.horarioFimVisita).toBe('18:30:00');
  });

  it(`#${EntidadesMapperService.prototype.toForm.name} DEVE mapear objeto que está no formato da API para o formato que o formulário de cadastro aceita QUANDO chamado com objeto da API.`, () => {
    const formatoAPI: Entidades = {
      id: 1,
      endereco: 'Endereço teste',
      nome: 'Nome teste',
      responsavel: 'Responsável teste',
      telefone: '99999999999',
      diasVisita: [
        DiaSemanaType.SEGUNDA.descricao,
        DiaSemanaType.TERCA.descricao,
      ],
      horarioInicioVisita: '12:30:00',
      horarioFimVisita: '18:30:00',
    };

    const formatoForm: EntidadesFormModel = service.toForm(formatoAPI);

    const dataHorarioInicioVisita = new Date();
    dataHorarioInicioVisita.setHours(12, 30, 0);

    const dataHorarioFimVisita = new Date();
    dataHorarioFimVisita.setHours(18, 30, 0);

    expect(formatoForm.id).toBe(1);
    expect(formatoForm.endereco).toBe('Endereço teste');
    expect(formatoForm.nome).toBe('Nome teste');
    expect(formatoForm.responsavel).toBe('Responsável teste');
    expect(formatoForm.telefone).toBe('99999999999');
    expect(formatoForm.diasVisita[0]).toBe(DiaSemanaType.SEGUNDA.descricao);
    expect(formatoForm.diasVisita[1]).toBe(DiaSemanaType.TERCA.descricao);
    expect(formatoForm.horarioInicioVisita?.getHours()).toBe(12);
    expect(formatoForm.horarioInicioVisita?.getMinutes()).toBe(30);
    expect(formatoForm.horarioInicioVisita?.getSeconds()).toBe(0);
    expect(formatoForm.horarioFimVisita?.getHours()).toBe(18);
    expect(formatoForm.horarioFimVisita?.getMinutes()).toBe(30);
    expect(formatoForm.horarioFimVisita?.getSeconds()).toBe(0);
  });
});
