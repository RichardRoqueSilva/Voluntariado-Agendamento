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
import { ModalAgendamentoComponent } from '../../components/agendamentos/modal-agendamento/modal-agendamento.component';
import { CommonModule } from '@angular/common';
import { AgendamentosService } from '../../components/agendamentos/agendamentos.service';
import { Agendamentos } from '../../components/agendamentos/agendamentos.model';


@Component({
  selector: 'app-agendamentos-crud',
  standalone: true,
  imports: [MatSidenavModule, MatCardModule, MatListModule, MatButtonModule, RouterModule,
    FormsModule, AgendamentosReadComponent, MatSortModule, MatPaginatorModule,
    MatSortModule, CommonModule, ModalAgendamentoComponent],
  templateUrl: './agendamentos-crud.component.html',
  styleUrl: './agendamentos-crud.component.css',
})
export class AgendamentosCrudComponent implements OnInit {

  agendamentos: Agendamentos = {
      nome: '',
      diasVisita: "00-00-0000",
      horario: '',
      listaParticipantes:[]
    }

  mostrarModal = false;

  constructor(private router: Router, 
    private headerService: HeaderService,
    private agendamentosService: AgendamentosService) {

    headerService.headerData = {
      title: 'Cadastro de Agendamentos',
      icon: 'storefront',
      routeUrl: '/agendamentos'
    }  
  }

  ngOnInit(): void {

  }
  // navigateToAgendamentosCreate(): void {
  //   this.router.navigate(['/agendamentos/create'])
  // }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarAgendamento(dados: any) {
    this.agendamentos.nome = dados.nome
    this.agendamentos.diasVisita = dados.data
    this.agendamentos.horario = dados.horario
    this.agendamentos.listaParticipantes = dados.participantes
    console.log('agendamento', this.agendamentos)
    this.agendamentosService.create(this.agendamentos).subscribe(agendamentos =>{
      this.agendamentosService.showMessage('Agendamento realizado com sucesso')
    })
    this.mostrarModal = false;
    window.location.reload();
    
  }


}

