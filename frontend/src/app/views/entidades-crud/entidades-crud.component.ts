import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntidadesReadComponent } from "../../components/entidades/entidades-read/entidades-read.component";
import { EntidadesRead2Component } from "../../components/entidades/entidades-read2/entidades-read2.component";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EntidadesUpdateComponent } from '../../components/entidades/entidades-update/entidades-update.component';
import { HeaderService } from '../../components/template/header/header.service';


@Component({
  selector: 'app-entidades-crud',
  imports: [MatSidenavModule, MatCardModule, MatListModule, MatButtonModule, RouterModule,
    FormsModule, MatSortModule, MatPaginatorModule, EntidadesReadComponent,
    MatSortModule, ],
  templateUrl: './entidades-crud.component.html',
  styleUrl: './entidades-crud.component.css',
  standalone: true,
})
export class EntidadesCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {

    headerService.headerData = {
      title: 'Entidades',
      icon: 'local_entidades',
      routeUrl: '/entidades'
    }  
  }

  ngOnInit(): void {

  }
  navigateToEntidadesCreate(): void {
    this.router.navigate(['/entidades/create'])
  }

}

