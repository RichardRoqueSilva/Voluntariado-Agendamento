// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { VoluntariosCrudComponent } from './views/voluntarios-crud/voluntarios-crud.component';
import { VoluntariosCreateComponent } from './components/voluntarios/voluntarios-create/voluntarios-create.component';
import { VoluntariosUpdateComponent } from './components/voluntarios/voluntarios-update/voluntarios-update.component';
import { VoluntariosDeleteComponent } from './components/voluntarios/voluntarios-delete/voluntarios-delete.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
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
  }
];