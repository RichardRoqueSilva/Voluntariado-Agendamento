import { Entidades } from "../../entidades/models/entidades.model"
import { Voluntarios } from "../../voluntarios/voluntarios.model"
import { StatusAgendamento } from "./status-agendamento-type.model"

export interface Agendamentos {
    id?: number
    entidade: Entidades
    diasVisita: string
    horario?: string
    listaParticipantes?: Voluntarios[]
    status: StatusAgendamento
}