import { DiaSemanaType } from '../../entidades/models/dia-semana-type.model';
import { VoluntarioRole } from '../../voluntarios/voluntarios.model';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { Agendamentos } from '../models/agendamentos.model';
import { StatusAgendamento } from '../models/status-agendamento-type.model';

export const AGENDAMENTOS_READ_MOCK: Agendamentos[] = [
  {
    id: 1,
    diasVisita: '2025-09-26',
    status: StatusAgendamento.CONFIRMADO,
    horario: '13:30:00',
    entidade: {
      id: 1,
      nome: 'Entidade teste',
      responsavel: 'Responsável teste',
      endereco: 'Endereço teste',
      telefone: '99999999999',
      horarioInicioVisita: '13:30:00',
      horarioFimVisita: '18:30:00',
      diasVisita: [
        DiaSemanaType.SEGUNDA.descricao,
        DiaSemanaType.TERCA.descricao,
      ],
    },
    listaParticipantes: [
      {
        id: 1,
        celular: '16988888888',
        email: 'email1@email.com',
        login: 'login_teste',
        nome: 'Nome teste 1',
        observacao: 'Obs teste 1',
        role: VoluntarioRole.ADMIN,
        senha: 'senha teste 1',
      },
      {
        id: 2,
        celular: '16988884444',
        email: 'email2@email.com',
        login: 'login_teste 2',
        nome: 'Nome teste 2',
        observacao: 'Obs teste 2',
        role: VoluntarioRole.USER,
        senha: 'senha teste 2',
      },
    ],
  },
];

export const AGENDAMENTOS_FORM_AGENDAMENTO_MOCK: AgendamentoForm = {
  diasVisita: '2025-09-26',
  status: StatusAgendamento.CONFIRMADO,
  horario: '13:30:00',
  entidadeId: 1,
  participantesIds: [1, 2],
};

export const AGENDAMENTOS_AGENDAMENTO_MOCK: Agendamentos = {
  id: 1,
  diasVisita: '2025-09-26',
  status: StatusAgendamento.CONFIRMADO,
  horario: '13:30:00',
  entidade: {
    id: 1,
    nome: 'Entidade teste',
    responsavel: 'Responsável teste',
    endereco: 'Endereço teste',
    telefone: '99999999999',
    horarioInicioVisita: '13:30:00',
    horarioFimVisita: '18:30:00',
    diasVisita: [
      DiaSemanaType.SEGUNDA.descricao,
      DiaSemanaType.TERCA.descricao,
    ],
  },
  listaParticipantes: [
    {
      id: 1,
      celular: '16988888888',
      email: 'email1@email.com',
      login: 'login_teste',
      nome: 'Nome teste 1',
      observacao: 'Obs teste 1',
      role: VoluntarioRole.ADMIN,
      senha: 'senha teste 1',
    },
    {
      id: 2,
      celular: '16988884444',
      email: 'email2@email.com',
      login: 'login_teste 2',
      nome: 'Nome teste 2',
      observacao: 'Obs teste 2',
      role: VoluntarioRole.USER,
      senha: 'senha teste 2',
    },
  ],
};
