import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HospitaisReadComponent } from "../../components/hospitais/hospitais-read/hospitais-read.component";
import { HospitaisRead2Component } from "../../components/hospitais/hospitais-read2/hospitais-read2.component";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HospitaisUpdateComponent } from '../../components/hospitais/hospitais-update/hospitais-update.component';
import { HeaderService } from '../../components/template/header/header.service';


@Component({
  selector: 'app-hospitais-crud',
  imports: [MatSidenavModule, MatCardModule, MatListModule, MatButtonModule, RouterModule,
    FormsModule, MatSortModule, MatPaginatorModule, HospitaisReadComponent,
    MatSortModule, ],
  templateUrl: './hospitais-crud.component.html',
  styleUrl: './hospitais-crud.component.css',
  standalone: true,
})
export class HospitaisCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {

    headerService.headerData = {
      title: 'Cadastro de Hospitais',
      icon: 'storefront',
      routeUrl: '/hospitais'
    }  
  }

  ngOnInit(): void {

  }
  navigateToHospitaisCreate(): void {
    this.router.navigate(['/hospitais/create'])
  }

}

