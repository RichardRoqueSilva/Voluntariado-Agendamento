export enum StatusAgendamento {
    CONFIRMADO= 'CONFIRMADO',
    AGUARDANDO_CONFIRMACAO = 'AGUARDANDO_CONFIRMACAO',
}

/**
 * Classe contendo a enumeração dos dias da semana
 */
export class StatusAgendamentoType {
    public static readonly CONFIRMADO = new StatusAgendamentoType(StatusAgendamento.CONFIRMADO, 'Confirmado')
    public static readonly AGUARDANDO_CONFIRMACAO = new StatusAgendamentoType(StatusAgendamento.AGUARDANDO_CONFIRMACAO, 'Aguardando Confirmação')
    
    private constructor(public readonly valor: string, public readonly descricao: string) {}

    public static getAllValues(): StatusAgendamentoType[] {
        return Object.values(StatusAgendamentoType) as StatusAgendamentoType[]
    }

    public static getStatus(status: StatusAgendamento) {
        return StatusAgendamentoType.getAllValues()
            .find(s => s.valor == status)
    }
}