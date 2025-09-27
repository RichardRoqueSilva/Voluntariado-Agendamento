import { StatusAgendamento } from './status-agendamento-type.model';

export interface AgendamentoForm {
  entidadeId: number;
  diasVisita: string;
  horario: string | null;
  participantesIds: number[];
  status: StatusAgendamento;
}
