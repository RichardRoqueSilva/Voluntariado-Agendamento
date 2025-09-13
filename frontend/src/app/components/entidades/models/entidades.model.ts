export interface Entidades {
    id?: number
    nome: string    
    endereco: string
    responsavel: string
    telefone: string
    diasVisita: string[]
    horarioInicioVisita: string | null
    horarioFimVisita: string | null
}