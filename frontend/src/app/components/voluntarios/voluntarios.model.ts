export interface Voluntarios {
    id?: number
    nome: string
    email: string
    celular: string
    observacao: string
    login: string
    senha: string
    role: VoluntarioRole
}

export enum VoluntarioRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}