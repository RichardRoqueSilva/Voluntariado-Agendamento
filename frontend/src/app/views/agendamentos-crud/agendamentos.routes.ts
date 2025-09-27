// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AgendamentosCrudComponent } from './agendamentos-crud.component';

export const agendamentosRoutes: Routes = [
  {
    path: '',
    component: AgendamentosCrudComponent,
  },
];
