import { HeaderData } from './components/template/header/header-data.model';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from "./components/template/nav/nav.component";
import { HomeComponent } from './views/home/home.component';
import { VoluntariosCrudComponent } from './views/voluntarios-crud/voluntarios-crud.component';
import { VoluntariosCreateComponent } from './components/voluntarios/voluntarios-create/voluntarios-create.component';
import { VoluntariosReadComponent } from './components/voluntarios/voluntarios-read/voluntarios-read.component';


import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VoluntariosRead2Component } from './components/voluntarios/voluntarios-read2/voluntarios-read2.component';
import { VoluntariosRead2DataSource } from './components/voluntarios/voluntarios-read2/voluntarios-read2-datasource';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { VoluntariosUpdateComponent } from './components/voluntarios/voluntarios-update/voluntarios-update.component';
import { VoluntariosDeleteComponent } from './components/voluntarios/voluntarios-delete/voluntarios-delete.component';



registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../styles.css'],
  imports: [ HeaderComponent, FooterComponent, MatSortModule, MatPaginatorModule, MatSortModule,
    NavComponent, MatCardModule, MatListModule, MatSidenavModule,  
    MatButtonModule, MatSnackBarModule, FormsModule,   
    MatFormFieldModule, MatInputModule,   
  ] ,
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }]
})
export class AppComponent {

}