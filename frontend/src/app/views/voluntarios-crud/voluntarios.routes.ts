// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { VoluntariosCreateComponent } from '../../components/voluntarios/voluntarios-create/voluntarios-create.component';
import { VoluntariosDeleteComponent } from '../../components/voluntarios/voluntarios-delete/voluntarios-delete.component';
import { VoluntariosUpdateComponent } from '../../components/voluntarios/voluntarios-update/voluntarios-update.component';
import { VoluntariosCrudComponent } from './voluntarios-crud.component';

export const voluntariosRoutes: Routes = [
  {
    path: '',
    component: VoluntariosCrudComponent,
  },
  {
    path: 'create',
    component: VoluntariosCreateComponent,
  },
  {
    path: 'update/:id',
    component: VoluntariosUpdateComponent,
  },
  {
    path: 'delete/:id',
    component: VoluntariosDeleteComponent,
  },
];
