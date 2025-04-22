import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentosReadComponent } from "../../components/agendamentos/agendamentos-read/agendamentos-read.component";
import { AgendamentosRead2Component } from "../../components/agendamentos/agendamentos-read2/agendamentos-read2.component";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgendamentosUpdateComponent } from '../../components/agendamentos/agendamentos-update/agendamentos-update.component';
import { HeaderService } from '../../components/template/header/header.service';


@Component({
  selector: 'app-agendamentos-crud',
  imports: [MatSidenavModule, MatCardModule, MatListModule, MatButtonModule, RouterModule,
    FormsModule, AgendamentosReadComponent, MatSortModule, MatPaginatorModule,
    MatSortModule, ],
  templateUrl: './agendamentos-crud.component.html',
  styleUrl: './agendamentos-crud.component.css',
  standalone: true,
})
export class AgendamentosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {

    headerService.headerData = {
      title: 'Cadastro de Agendamentos',
      icon: 'storefront',
      routeUrl: '/agendamentos'
    }  
  }

  ngOnInit(): void {

  }
  navigateToAgendamentosCreate(): void {
    this.router.navigate(['/agendamentos/create'])
  }

}

