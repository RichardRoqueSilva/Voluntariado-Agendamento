import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntidadesService } from '../../entidades/entidades.service';
import { Entidades } from '../../entidades/entidades.model';
import { VoluntariosService } from '../../voluntarios/voluntarios.service';
import { Voluntarios } from '../../voluntarios/voluntarios.model';
import { Agendamentos } from '../agendamentos.model';

@Component({
  standalone: true,
  selector: 'app-modal-agendamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-agendamento.component.html',
  styleUrl: './modal-agendamento.component.css'
})
export class ModalAgendamentoComponent implements OnInit {

  agendamentos: Agendamentos = {
    nome: '',
    diasVisita: "00-00-0000",
    horario: '',
    listaParticipantes:[]
  }

  @Input() agendamento: any

  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();

  agendamentoForm: FormGroup;
  participantesSelecionados: string[] = [];

  entidades: Entidades[] = []
  voluntarios: Voluntarios[] = []

  nomes = [''];
  horarios = ['17:00', '18:00', '19:00', '20:00'];
  participantes = [''];

  editando: boolean = false

  constructor(private fb: FormBuilder,
    private entidadesService: EntidadesService,
    private voluntariosService: VoluntariosService
  ) {
    this.agendamentos = this.agendamento
    this.agendamentoForm = this.fb.group({
      nome: [''],
      data: [''],
      horario: [''],
      participanteSelecionado: [''],
    });
  }

  ngOnInit(): void {
    this.entidadesService.read().subscribe(Entidades => {
      this.entidades = Entidades
      console.log('',this.entidades)
      this.nomes = this.entidades.map(entidade => entidade.nome);
    })
    this.voluntariosService.read().subscribe(voluntarios => {
      this.voluntarios = voluntarios
      console.log(voluntarios)
      this.participantes = this.voluntarios.map(voluntario => voluntario.nome);
    })

    this.receberDados()
    // if (this.agendamento) {
    //   console.log('agen',this.agendamento)
    //   this.agendamentoForm.get('nome')?.setValue(this.agendamentos.nome)
    //   this.agendamentoForm.get('data')?.setValue(this.agendamentos.diasVisita)
    //   this.agendamentoForm.get('horario')?.setValue(this.agendamentos.horario)
    //   this.participantesSelecionados = this.agendamento.listaParticipantes
    // }
    
  }

  adicionarParticipante() {
    const p = this.agendamentoForm.value.participanteSelecionado;
    if (p && !this.participantesSelecionados.includes(p)) {
      this.participantesSelecionados.push(p);
    }
    this.agendamentoForm.patchValue({ participanteSelecionado: '' });
  }

  removerParticipante(index: number) {
    this.participantesSelecionados.splice(index, 1);
  }

  onSalvar() {

    if(this.agendamento) {
      const dados = {
        id: this.agendamento.id,
        nome: this.agendamentoForm.value.nome,
        data: this.agendamentoForm.value.data,
        horario: this.agendamentoForm.value.horario,
        participantes: this.participantesSelecionados,
      };
      this.salvar.emit(dados);
    } else {
      const dados = {
        id: null,
        nome: this.agendamentoForm.value.nome,
        data: this.agendamentoForm.value.data,
        horario: this.agendamentoForm.value.horario,
        participantes: this.participantesSelecionados,
      };
      this.salvar.emit(dados);
    }

    
  }

  onFechar() {
    this.fechar.emit();
  }

  receberDados() {
    if(this.agendamento) {
      this.editando = true
      console.log('agendamento na modal',this.agendamento)
      this.participantesSelecionados = this.agendamento.listaParticipantes
      this.agendamentoForm.get('nome')?.setValue(this.agendamento.nome)
      this.agendamentoForm.get('data')?.setValue(this.agendamento.diasVisita)
      this.agendamentoForm.get('horario')?.setValue(this.agendamento.horario)
    }
  }

}