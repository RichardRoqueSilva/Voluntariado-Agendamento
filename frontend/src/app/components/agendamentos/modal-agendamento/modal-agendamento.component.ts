import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Entidades } from '../../entidades/models/entidades.model';
import { EntidadesService } from '../../entidades/services/entidades.service';
import { Voluntarios } from '../../voluntarios/voluntarios.model';
import { VoluntariosService } from '../../voluntarios/voluntarios.service';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { Agendamentos } from '../models/agendamentos.model';

@Component({
  standalone: true,
  selector: 'app-modal-agendamento',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './modal-agendamento.component.html',
  styleUrl: './modal-agendamento.component.css'
})
export class ModalAgendamentoComponent implements OnInit {

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
    listaParticipantes:[]
  }

  @Input() agendamento!: Agendamentos

  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<AgendamentoForm>();

  agendamentoForm: FormGroup;
  participantesSelecionados: Voluntarios[] = [];

  entidades: Entidades[] = []
  voluntarios: Voluntarios[] = []

  horarios: string[] = [];
  participantes = [''];

  editando: boolean = false

  constructor(private fb: FormBuilder,
    private entidadesService: EntidadesService,
    private voluntariosService: VoluntariosService,
    private _dr: DestroyRef
  ) {
    this.agendamentos = {...this.agendamento}
    this.agendamentoForm = this.fb.group({
      entidadeId: ['', Validators.required],
      diasVisita: ['', Validators.required],
      horario: ['', Validators.required],
      participanteSelecionado: [''],
    });
  }

  ngOnInit(): void {
    this.entidadesService.read().subscribe(Entidades => {
      this.entidades = Entidades
      console.log('',this.entidades)
    })
    this.voluntariosService.read().subscribe(voluntarios => {
      this.voluntarios = voluntarios
      console.log(voluntarios)
      this.participantes = this.voluntarios.map(voluntario => voluntario.nome);
    })

    this.receberDados()
    this._observaMudancaEntidadeSelecionada()
    // if (this.agendamento) {
    //   console.log('agen',this.agendamento)
    //   this.agendamentoForm.get('nome')?.setValue(this.agendamentos.nome)
    //   this.agendamentoForm.get('data')?.setValue(this.agendamentos.diasVisita)
    //   this.agendamentoForm.get('horario')?.setValue(this.agendamentos.horario)
    //   this.participantesSelecionados = this.agendamento.listaParticipantes
    // }
    
  }

  adicionarParticipante() {
    const idParticipante = this.agendamentoForm.value.participanteSelecionado;
    const estaComoParticipante = this.participantesSelecionados.some(p => p.id == idParticipante)
    const participanteSelecionado = this.voluntarios.find(v => v.id == idParticipante)

    if (idParticipante && !estaComoParticipante && participanteSelecionado) {
      this.participantesSelecionados.push(participanteSelecionado);
    }

    this.agendamentoForm.patchValue({ participanteSelecionado: '' });
  }

  removerParticipante(index: number) {
    this.participantesSelecionados.splice(index, 1);
  }

  onSalvar() {
    const form = <AgendamentoForm>this.agendamentoForm.value
    const participantes = this.participantesSelecionados.map(p => p.id) as number[]

    const dados: AgendamentoForm = {
      entidadeId: form.entidadeId,
      diasVisita: form.diasVisita,
      horario: form.horario,
      participantesIds: participantes
    };

    this.salvar.emit(dados);
  }

  onFechar() {
    this.fechar.emit();
  }

  receberDados() {
    if(this.agendamento) {
      this.editando = true
      console.log('agendamento na modal',this.agendamento)
      this.participantesSelecionados = this.agendamento.listaParticipantes != null
        ? [...this.agendamento.listaParticipantes]
        : []
        
      this.agendamentoForm.get('entidadeId')?.setValue(this.agendamento.entidade.id)
      this.agendamentoForm.get('diasVisita')?.setValue(this.agendamento.diasVisita)
      this.agendamentoForm.get('horario')?.setValue(this.agendamento.horario)

      this._atualizaHorarioDaEntidade(this.agendamento.entidade)
    }
  }

  public isCampoComErro(nomeCampo: string, nomeErro: string) {
    const campo = this.agendamentoForm.get(nomeCampo)
    return campo?.hasError(nomeErro) && campo.touched
  }

  public isCampoParticipanteTocado() {
    return this.agendamentoForm.get('participanteSelecionado')?.touched
  }

  /**
   * Observa a mudança do campo de entidade, pois quando ela é modificada, é necessário modificar os horários
   * disponíveis para aquela entidade
   */
  private _observaMudancaEntidadeSelecionada(): void {
    this.agendamentoForm.get('entidadeId')?.valueChanges
    .pipe(takeUntilDestroyed(this._dr))
    .subscribe((idEntidadeSelecionada: number) => {
      const entidadeSelecionada = this.entidades.find(e => e.id == idEntidadeSelecionada)

      this._atualizaHorarioDaEntidade(entidadeSelecionada)
    })
  }

  /**
   * Calcula os horários disponível da entidade a partir das propriedades horarioInicioVisita e horarioFimVisita
   * @param entidade 
   * @returns Horários disponíveis pela entidade, com intervalos de 15 minutos.
   */
  private _calcularHorariosDisponiveisEntidade(entidade: Entidades | undefined): string[] {
    if(!entidade) {
      return []
    }

    const partesHorarioInicial = entidade.horarioInicioVisita?.split(':')
    const partesHorarioFinal = entidade.horarioFimVisita?.split(':')

    let horaInicial = partesHorarioInicial != null ? parseInt(partesHorarioInicial[0]) : null
    let minutoInicial = partesHorarioInicial != null ? parseInt(partesHorarioInicial[1]) : null

    let horaFinal = partesHorarioFinal != null ? parseInt(partesHorarioFinal[0]) : null
    let minutoFinal = partesHorarioFinal != null ? parseInt(partesHorarioFinal[1]) : null

    if(horaInicial == null || minutoInicial == null || horaFinal == null || minutoFinal == null) {
      return []
    }

    if(this._isHorarioMenor(horaFinal, minutoFinal, horaInicial, minutoInicial)) {
      const horaTemp = horaInicial
      const minutoTemp = minutoInicial

      horaFinal = horaInicial
      minutoFinal = minutoInicial
      horaInicial = horaTemp
      minutoInicial = minutoTemp
    }

    let horaCalculada = horaInicial
    let minutoCalculado = minutoInicial
    const incrementoEmMinutos = 15
    const listaHorarios = [this._getHorario(horaCalculada, minutoCalculado)]

    while(this._isHorarioMenor(horaCalculada, minutoCalculado, horaFinal, minutoFinal)) {

      minutoCalculado += incrementoEmMinutos

      if(minutoCalculado >= 60) {
        minutoCalculado = 0
        horaCalculada += 1
      }

      if(horaCalculada >= 24) {
        horaCalculada = 0
      }

      listaHorarios.push(this._getHorario(horaCalculada, minutoCalculado))
    }

    return listaHorarios
  }

  /**
   * A partir da entidade, será populado os horários que a entidade tem disponibilidade e, caso o campo de horário esteja preenchido
   * fora destes horários válidos, ele será limpo
   * @param entidadeSelecionada Entidade atual
   */
  private _atualizaHorarioDaEntidade(entidadeSelecionada: Entidades | undefined): void {
    if(!entidadeSelecionada) {
      return
    }

    this.horarios = this._calcularHorariosDisponiveisEntidade(entidadeSelecionada)
    const valorHorario = this.agendamentoForm.get('horario')?.value

    // Se o horário que estava selecionado não estiver mais disponível, a seleção serão removida
    if(!this.horarios.includes(valorHorario)) {
      this.agendamentoForm.get('horario')?.setValue(null)
    }
  }

  /**
   * Formata o valor de horário no formato da API
   * @param hora Hora do horário
   * @param minuto Minuto do horário
   * @returns Retorna o valor no formato HH:mm:ss
   */
  private _getHorario(hora: number, minuto: number): string {
    return `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}:00`
  }

  /**
   * Valida se o primeiro horário é menor que o segundo horário
   * @param horaInicial Hora do primeiro horário
   * @param minutoInicial Minuto do primeiro horário
   * @param horaFinal Hora do segundo horário
   * @param minutoFinal Minuto do segundo horário
   * @returns true se o primeiro horário vem antes do segundo horário, caso contrário, retornará false
   */
  private _isHorarioMenor(horaInicial: number, minutoInicial: number, horaFinal: number, minutoFinal: number): boolean {
    if(horaInicial < horaFinal) {
      return true
    }

    if(horaInicial == horaFinal && minutoInicial < minutoFinal) {
      return true
    }

    return false
  }
}