// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  // 1. Rota específica para o componente de login
  {
    path: 'login',
    component: LoginComponent,
  },

  // 2. Redirecionamento da raiz para a tela de login
  //    Quando o usuário acessa "/", ele é enviado para "/login"
  {
    path: '', // Caminho vazio (raiz)
    redirectTo: '/login', // Para onde redirecionar
    pathMatch: 'full', // Só redireciona se o caminho for EXATAMENTE vazio
  },

  // 3. Rota explícita para o HomeComponent (tela principal pós-login)
  //    O LoginComponent agora deve navegar para '/home' após sucesso
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.routes').then((r) => r.homeRoutes),
  },

  // 4. Suas rotas CRUD existentes (permanecem iguais)
  {
    path: 'voluntarios',
    loadChildren: () =>
      import('./views/voluntarios-crud/voluntarios.routes').then(
        (r) => r.voluntariosRoutes
      ),
  },
  {
    path: 'entidades',
    loadChildren: () =>
      import('./views/entidades-crud/entidades.routes').then(
        (r) => r.entidadesRoutes
      ),
  },
  {
    path: 'agendamentos',
    loadChildren: () =>
      import('./views/agendamentos-crud/agendamentos.routes').then(
        (r) => r.agendamentosRoutes
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./views/dashboard/dashboard.routes').then(
        (r) => r.dashboardRoutes
      ),
  },

  // Opcional: Adicionar uma rota curinga no final para capturar URLs inválidas
  // { path: '**', redirectTo: '/login' } // Redireciona qualquer outra coisa para login
];
