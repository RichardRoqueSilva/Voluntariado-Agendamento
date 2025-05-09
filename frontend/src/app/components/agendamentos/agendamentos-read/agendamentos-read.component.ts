import { Agendamentos } from './../agendamentos.model';
import { AgendamentosService } from '../agendamentos.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AgendamentosDeleteComponent } from '../agendamentos-delete/agendamentos-delete.component';
import { AgendamentosUpdateComponent } from '../agendamentos-update/agendamentos-update.component';
import { AgendamentosCreateComponent } from '../agendamentos-create/agendamentos-create.component';
import { ModalAgendamentoComponent } from '../modal-agendamento/modal-agendamento.component';

@Component({
  selector: 'app-agendamentos-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule, ModalAgendamentoComponent],
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css',],
  standalone: true,
})
export class AgendamentosReadComponent implements OnInit{

  agendamento: Agendamentos = {
    nome: '',
    diasVisita: "00-00-0000",
    horario: '',
    listaParticipantes:[]
  }

  agendamentos: Agendamentos[] = []
  displayedColumns = ['nome', 'visita', 'horario', 'voluntarios', 'action']

  mostrarModal: boolean = false;

  constructor(private agendamentosService: AgendamentosService){}

  ngOnInit(): void {
    this.agendamentosService.read().subscribe(Agendamentos => {
      this.agendamentos = Agendamentos
      console.log(Agendamentos)
    })
      
  }

  buscarAgendamentos() {
    this.agendamentosService.read().subscribe(Agendamentos => {
      this.agendamentos = Agendamentos
      console.log(Agendamentos)
    })
  }

  // deleteAgendamentos(id: any): void {
  //   this.agendamentosService.delete(id ?? 0).subscribe(() => {
  //     this.agendamentosService.showMessage('Entidade excluida com sucesso!')
  //     this.buscarAgendamentos()
  //   });

  // }

  deleteAgendamentos(id: any): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.agendamentosService.delete(id ?? 0).subscribe(() => {
        this.agendamentosService.showMessage('Entidade excluída com sucesso!');
        this.buscarAgendamentos();
      }, error => {
        console.error('Erro ao excluir o agendamento:', error);
      });
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarAgendamento(dados: any) {
    if (dados.id) {
      this.agendamento.id = dados.id
      this.agendamento.nome = dados.nome
      this.agendamento.diasVisita = dados.data
      this.agendamento.horario = dados.horario
      this.agendamento.listaParticipantes = dados.participantes
      this.agendamentosService.update(this.agendamento).subscribe(() =>{
        this.agendamentosService.showMessage('Agendamento atualizado com sucesso!')
      })
    } else {
      this.agendamento.nome = dados.nome
      this.agendamento.diasVisita = dados.data
      this.agendamento.horario = dados.horario
      this.agendamento.listaParticipantes = dados.participantes
      console.log('agendamento', this.agendamentos)
      this.agendamentosService.create(this.agendamento).subscribe(agendamentos =>{
      this.agendamentosService.showMessage('Agendamento realizado com sucesso')
    })
    }
    
    this.mostrarModal = false;
    window.location.reload();
    
  }

  editarAgendamento(id: any) { 
   const index =  this.agendamentos.findIndex(agen => agen.id === id)
   this.agendamento = this.agendamentos[index]
   this.abrirModal()
  }

  salvarEdicao(dados:any) {

  }

}
