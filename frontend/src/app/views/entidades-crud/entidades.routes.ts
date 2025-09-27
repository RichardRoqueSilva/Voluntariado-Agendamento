// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EntidadesCreateComponent } from '../../components/entidades/entidades-create/entidades-create.component';
import { EntidadesDeleteComponent } from '../../components/entidades/entidades-delete/entidades-delete.component';
import { EntidadesUpdateComponent } from '../../components/entidades/entidades-update/entidades-update.component';
import { EntidadesCrudComponent } from './entidades-crud.component';

export const entidadesRoutes: Routes = [
  {
    path: '',
    component: EntidadesCrudComponent,
  },
  {
    path: 'create',
    component: EntidadesCreateComponent,
  },
  {
    path: 'update/:id',
    component: EntidadesUpdateComponent,
  },
  {
    path: 'delete/:id',
    component: EntidadesDeleteComponent,
  },
];
