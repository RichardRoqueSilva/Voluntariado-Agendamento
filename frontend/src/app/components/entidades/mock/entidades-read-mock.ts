import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { Entidades } from '../models/entidades.model';

export const ENTIDADES_READ_MOCK: Entidades[] = [
  {
    id: 1,
    nome: 'Entidade teste',
    responsavel: 'Responsável teste',
    telefone: '99999999999',
    endereco: 'Endereço teste',
    horarioInicioVisita: '13:30:00',
    horarioFimVisita: '18:30:00',
    diasVisita: [
      DiaSemanaType.SEGUNDA.descricao,
      DiaSemanaType.TERCA.descricao,
    ],
  },
];

const dataHorarioInicioVisita = new Date();
dataHorarioInicioVisita.setHours(12, 30, 0);

const dataHorarioFimVisita = new Date();
dataHorarioFimVisita.setHours(18, 30, 0);

export const ENTIDADES_FORM_CRIADO_MOCK: EntidadesFormModel = {
  id: 1,
  endereco: 'Endereço teste',
  nome: 'Nome teste',
  responsavel: 'Responsável teste',
  telefone: '99999999999',
  diasVisita: [DiaSemanaType.SEGUNDA.descricao, DiaSemanaType.TERCA.descricao],
  horarioInicioVisita: dataHorarioInicioVisita,
  horarioFimVisita: dataHorarioFimVisita,
};

export const ENTIDADES_CRIADO_MOCK: Entidades = {
  id: 1,
  endereco: 'Endereço teste',
  nome: 'Nome teste',
  responsavel: 'Responsável teste',
  telefone: '99999999999',
  diasVisita: [DiaSemanaType.SEGUNDA.descricao, DiaSemanaType.TERCA.descricao],
  horarioInicioVisita: '12:30:00',
  horarioFimVisita: '18:30:00',
};
