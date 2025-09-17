import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { AgendamentosReadComponent } from "../../components/agendamentos/agendamentos-read/agendamentos-read.component";
import { AgendamentosService } from '../../components/agendamentos/agendamentos.service';
import { ModalAgendamentoComponent } from '../../components/agendamentos/modal-agendamento/modal-agendamento.component';
import { AgendamentoForm } from '../../components/agendamentos/models/agendamentos-form.model';
import { Agendamentos } from '../../components/agendamentos/models/agendamentos.model';
import { StatusAgendamento } from '../../components/agendamentos/models/status-agendamento-type.model';
import { HeaderService } from '../../components/template/header/header.service';


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

  @ViewChild(AgendamentosReadComponent, {static: true})
  agentamentosReadComponent!: AgendamentosReadComponent

  agendamentos: Agendamentos = {
      entidade: {
      nome: '',
      endereco: '',
      responsavel: '',
      telefone: '',
      diasVisita: [],
      horarioInicioVisita: null,
      horarioFimVisita: null,
    },
    diasVisita: "00-00-0000",
    horario: '',
    listaParticipantes:[],
    status: StatusAgendamento.AGUARDANDO_CONFIRMACAO
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

  salvarAgendamento(dados: AgendamentoForm) {
    console.log('agendamento', dados)
    this.agendamentosService.create(dados).subscribe(() =>{
      this.agendamentosService.showMessage('Agendamento realizado com sucesso')
      this.agentamentosReadComponent.buscarAgendamentos()
    })
    this.mostrarModal = false;
  }
}

