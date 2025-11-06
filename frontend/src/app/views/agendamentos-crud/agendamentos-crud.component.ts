import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AgendamentosReadComponent } from '../../components/agendamentos/agendamentos-read/agendamentos-read.component';
import { AgendamentosService } from '../../components/agendamentos/agendamentos.service';
import { ModalAgendamentoComponent } from '../../components/agendamentos/modal-agendamento/modal-agendamento.component';
import { AgendamentoForm } from '../../components/agendamentos/models/agendamentos-form.model';
import { Agendamentos } from '../../components/agendamentos/models/agendamentos.model';
import { ModalAgendamentoModoType } from '../../components/agendamentos/models/modal-agendamento.model';
import { StatusAgendamento } from '../../components/agendamentos/models/status-agendamento-type.model';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-agendamentos-crud',
  standalone: true,
  imports: [
    MatButtonModule,
    AgendamentosReadComponent,
    CommonModule,
    ModalAgendamentoComponent,
  ],
  templateUrl: './agendamentos-crud.component.html',
  styleUrl: './agendamentos-crud.component.css',
})
export class AgendamentosCrudComponent implements OnInit {
  @ViewChild(AgendamentosReadComponent, { static: true })
  agentamentosReadComponent!: AgendamentosReadComponent;

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
    diasVisita: '00-00-0000',
    horario: '',
    listaParticipantes: [],
    status: StatusAgendamento.AGUARDANDO_CONFIRMACAO,
  };

  mostrarModal = false;

  modo = ModalAgendamentoModoType.INCLUSAO;

  perfilAdm: boolean = false
  descricaoPerfil: string = ''

  constructor(
    headerService: HeaderService,
    private agendamentosService: AgendamentosService
  ) {
    headerService.headerData = {
      title: 'Cadastro de Agendamentos',
      icon: 'storefront',
      routeUrl: '/agendamentos',
    };
  }

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    if (role === 'ADMIN') {
      this.perfilAdm = true
      this.descricaoPerfil = 'Administrador'
    } else {
      this.perfilAdm = false
      this.descricaoPerfil = 'Usuário'
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarAgendamento(dados: AgendamentoForm) {
    console.log('agendamento', dados);
    this.agendamentosService.create(dados).subscribe(() => {
      this.agendamentosService.showMessage('Agendamento realizado com sucesso');
      this.agentamentosReadComponent.buscarAgendamentos();
    });
    this.mostrarModal = false;
  }
}
