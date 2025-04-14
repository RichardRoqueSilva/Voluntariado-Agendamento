// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { VoluntariosCrudComponent } from './views/voluntarios-crud/voluntarios-crud.component';
import { VoluntariosCreateComponent } from './components/voluntarios/voluntarios-create/voluntarios-create.component';
import { VoluntariosUpdateComponent } from './components/voluntarios/voluntarios-update/voluntarios-update.component';
import { VoluntariosDeleteComponent } from './components/voluntarios/voluntarios-delete/voluntarios-delete.component';
import { HospitaisCrudComponent } from './views/hospitais-crud/hospitais-crud.component';
import { HospitaisCreateComponent } from './components/hospitais/hospitais-create/hospitais-create.component';
import { HospitaisUpdateComponent } from './components/hospitais/hospitais-update/hospitais-update.component';
import { HospitaisDeleteComponent } from './components/hospitais/hospitais-delete/hospitais-delete.component';

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
  },
  {
    path: 'hospitais',
    component: HospitaisCrudComponent
  },
  {
    path: 'hospitais/create',
    component: HospitaisCreateComponent
  },
  {
    path: 'hospitais/update/:id',
    component: HospitaisUpdateComponent
  },
  {
    path: 'hospitais/delete/:id',
    component: HospitaisDeleteComponent
  }
];