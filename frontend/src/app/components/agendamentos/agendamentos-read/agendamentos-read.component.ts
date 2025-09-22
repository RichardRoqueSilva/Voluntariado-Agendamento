import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgendamentosService } from '../agendamentos.service';
import { ModalAgendamentoComponent } from '../modal-agendamento/modal-agendamento.component';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { Agendamentos } from '../models/agendamentos.model';
import { ModalAgendamentoModoType } from '../models/modal-agendamento.model';
import {
  StatusAgendamento,
  StatusAgendamentoType,
} from '../models/status-agendamento-type.model';

@Component({
  selector: 'app-agendamentos-read',
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    ModalAgendamentoComponent,
    MatTooltipModule,
  ],
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css'],
  standalone: true,
})
export class AgendamentosReadComponent implements OnInit {
  agendamento: Agendamentos = {
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

  agendamentos: Agendamentos[] = [];
  displayedColumns = [
    'nome',
    'visita',
    'horario',
    'status',
    'voluntarios',
    'action',
  ];

  mostrarModal: boolean = false;

  modo = ModalAgendamentoModoType.EDICAO;

  statusTypes = StatusAgendamento;

  constructor(private agendamentosService: AgendamentosService) {}

  ngOnInit(): void {
    this.agendamentosService.read().subscribe((agendamentos) => {
      this.agendamentos = agendamentos;
      console.log(agendamentos);
    });
  }

  buscarAgendamentos() {
    this.agendamentosService.read().subscribe((agendamentos) => {
      this.agendamentos = agendamentos;
      console.log(agendamentos);
    });
  }

  // deleteAgendamentos(id: any): void {
  //   this.agendamentosService.delete(id ?? 0).subscribe(() => {
  //     this.agendamentosService.showMessage('Entidade excluida com sucesso!')
  //     this.buscarAgendamentos()
  //   });

  // }

  deleteAgendamentos(id: any): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.agendamentosService.delete(id ?? 0).subscribe(
        () => {
          this.agendamentosService.showMessage(
            'Entidade excluída com sucesso!'
          );
          this.buscarAgendamentos();
        },
        (error) => {
          console.error('Erro ao excluir o agendamento:', error);
        }
      );
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarAgendamento(dados: AgendamentoForm) {
    if (this.agendamento.id) {
      this.agendamentosService
        .update(this.agendamento.id, dados)
        .subscribe(() => {
          this.agendamentosService.showMessage(
            'Agendamento atualizado com sucesso!'
          );
          this.buscarAgendamentos();
        });
    } else {
      this.agendamentosService.create(dados).subscribe(() => {
        this.agendamentosService.showMessage(
          'Agendamento realizado com sucesso'
        );
        this.buscarAgendamentos();
      });
    }

    this.mostrarModal = false;
  }

  editarAgendamento(id: any) {
    const index = this.agendamentos.findIndex((agen) => agen.id === id);
    this.agendamento = this.agendamentos[index];
    this.abrirModal();
  }

  getDescricaoStatus(status: StatusAgendamento): string | undefined {
    return StatusAgendamentoType.getStatus(status)?.descricao;
  }
}
