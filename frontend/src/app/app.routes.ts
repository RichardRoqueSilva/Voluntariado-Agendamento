// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { VoluntariosCrudComponent } from './views/voluntarios-crud/voluntarios-crud.component';
import { VoluntariosCreateComponent } from './components/voluntarios/voluntarios-create/voluntarios-create.component';
import { VoluntariosUpdateComponent } from './components/voluntarios/voluntarios-update/voluntarios-update.component';
import { VoluntariosDeleteComponent } from './components/voluntarios/voluntarios-delete/voluntarios-delete.component';
import { EntidadesCrudComponent } from './views/entidades-crud/entidades-crud.component';
import { EntidadesCreateComponent } from './components/entidades/entidades-create/entidades-create.component';
import { EntidadesUpdateComponent } from './components/entidades/entidades-update/entidades-update.component';
import { AgendamentosCrudComponent } from './views/agendamentos-crud/agendamentos-crud.component';
import { AgendamentosCreateComponent } from './components/agendamentos/agendamentos-create/agendamentos-create.component';
import { AgendamentosUpdateComponent } from './components/agendamentos/agendamentos-update/agendamentos-update.component';
import { AgendamentosDeleteComponent } from './components/agendamentos/agendamentos-delete/agendamentos-delete.component';
import { EntidadesDeleteComponent } from './components/entidades/entidades-delete/entidades-delete.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  // 1. Rota específica para o componente de login
  {
    path: 'login',
    component: LoginComponent
  },

  // 2. Redirecionamento da raiz para a tela de login
  //    Quando o usuário acessa "/", ele é enviado para "/login"
  {
    path: '', // Caminho vazio (raiz)
    redirectTo: '/login', // Para onde redirecionar
    pathMatch: 'full' // Só redireciona se o caminho for EXATAMENTE vazio
  },

  // 3. Rota explícita para o HomeComponent (tela principal pós-login)
  //    O LoginComponent agora deve navegar para '/home' após sucesso
  {
    path: 'home',
    component: HomeComponent
  },

  // 4. Suas rotas CRUD existentes (permanecem iguais)
  {
    path: 'voluntarios',
    component: VoluntariosCrudComponent
  },
  {
    path: 'voluntarios/create',
    component: VoluntariosCreateComponent
  },
  {
    path: 'voluntarios/update/:id',
    component: VoluntariosUpdateComponent
  },
  {
    path: 'voluntarios/delete/:id',
    component: VoluntariosDeleteComponent
  },
  {
    path: 'entidades',
    component: EntidadesCrudComponent
  },
  {
    path: 'entidades/create',
    component: EntidadesCreateComponent
  },
  {
    path: 'entidades/update/:id',
    component: EntidadesUpdateComponent
  },
  {
    path: 'entidades/delete/:id',
    component: EntidadesDeleteComponent
  },
  {
    path: 'agendamentos',
    component: AgendamentosCrudComponent
  },
  {
    path: 'agendamentos/create',
    component: AgendamentosCreateComponent
  },
  {
    path: 'agendamentos/update/:id',
    component: AgendamentosUpdateComponent
  },
  {
    path: 'agendamentos/delete/:id',
    component: AgendamentosDeleteComponent
  }

  // Opcional: Adicionar uma rota curinga no final para capturar URLs inválidas
  // { path: '**', redirectTo: '/login' } // Redireciona qualquer outra coisa para login
];