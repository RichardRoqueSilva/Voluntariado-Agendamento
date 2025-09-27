import { AgendamentoForm } from '../../../components/agendamentos/models/agendamentos-form.model';
import { StatusAgendamento } from '../../../components/agendamentos/models/status-agendamento-type.model';
import { DiaSemanaType } from '../../../components/entidades/models/dia-semana-type.model';

export const AGENDAMENTO_FORM_MOCK: AgendamentoForm = {
  entidadeId: 1,
  diasVisita: DiaSemanaType.QUINTA.descricao,
  horario: '11:13:00',
  status: StatusAgendamento.AGUARDANDO_CONFIRMACAO,
  participantesIds: [1, 2],
};
