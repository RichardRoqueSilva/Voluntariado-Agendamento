export interface EntidadesFormModel {
    id?: number
    nome: string    
    endereco: string
    responsavel: string
    telefone: string
    diasVisita: string[]
    horarioInicioVisita: Date | null
    horarioFimVisita: Date | null
}