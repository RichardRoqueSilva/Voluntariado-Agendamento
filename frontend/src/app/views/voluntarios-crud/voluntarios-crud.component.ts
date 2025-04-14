import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VoluntariosReadComponent } from "../../components/voluntarios/voluntarios-read/voluntarios-read.component";
import { VoluntariosRead2Component } from "../../components/voluntarios/voluntarios-read2/voluntarios-read2.component";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VoluntariosUpdateComponent } from '../../components/voluntarios/voluntarios-update/voluntarios-update.component';
import { HeaderService } from '../../components/template/header/header.service';


@Component({
  selector: 'app-voluntarios-crud',
  imports: [MatSidenavModule, MatCardModule, MatListModule, MatButtonModule, RouterModule,
    FormsModule, VoluntariosReadComponent, MatSortModule, MatPaginatorModule,
    MatSortModule, ],
  templateUrl: './voluntarios-crud.component.html',
  styleUrl: './voluntarios-crud.component.css',
  standalone: true,
})
export class VoluntariosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {

    headerService.headerData = {
      title: 'Cadastro de Voluntários',
      icon: 'storefront',
      routeUrl: '/voluntarios'
    }  
  }

  ngOnInit(): void {

  }
  navigateToVoluntariosCreate(): void {
    this.router.navigate(['/voluntarios/create'])
  }

}

