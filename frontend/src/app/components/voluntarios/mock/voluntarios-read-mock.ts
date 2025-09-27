import { VoluntarioRole, Voluntarios } from '../voluntarios.model';

export const VOLUNTARIOS_READ_MOCK: Voluntarios[] = [
  {
    id: 1,
    celular: '99999999999',
    email: 'email@email.com',
    login: 'login',
    nome: 'Nome',
    observacao: 'Obs',
    senha: 'senha',
    role: VoluntarioRole.USER,
  },
];

export const VOLUNTARIO_CRIADO_MOCK: Voluntarios = {
  id: 1,
  celular: '99999999999',
  email: 'email@email.com',
  login: 'login',
  nome: 'Nome',
  observacao: 'Obs',
  senha: 'senha',
  role: VoluntarioRole.USER,
};
