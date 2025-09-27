import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { SharedPipesModule } from '../../../shared/pipes';
import { DataService } from '../../../shared/services/data';
import { HorarioService } from '../../../shared/services/horario';
import { DiaSemanaType } from '../../entidades/models/dia-semana-type.model';
import { Entidades } from '../../entidades/models/entidades.model';
import { EntidadesService } from '../../entidades/services/entidades.service';
import { Voluntarios } from '../../voluntarios/voluntarios.model';
import { VoluntariosService } from '../../voluntarios/voluntarios.service';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { Agendamentos } from '../models/agendamentos.model';
import { ModalAgendamentoModoType } from '../models/modal-agendamento.model';
import {
  StatusAgendamento,
  StatusAgendamentoType,
} from '../models/status-agendamento-type.model';

@Component({
  standalone: true,
  selector: 'app-modal-agendamento',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatTimepickerModule,
    SharedPipesModule,
  ],
  templateUrl: './modal-agendamento.component.html',
  styleUrl: './modal-agendamento.component.css',
})
export class ModalAgendamentoComponent implements OnInit, OnChanges {
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

  @Input() agendamento!: Agendamentos;
  @Input() modo: ModalAgendamentoModoType = ModalAgendamentoModoType.INCLUSAO;

  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<AgendamentoForm>();

  agendamentoForm: FormGroup;
  participantesSelecionados: Voluntarios[] = [];

  entidadeSelecionada?: Entidades;

  entidades: Entidades[] = [];
  voluntarios: Voluntarios[] = [];

  horarios: string[] = [];
  participantes = [''];

  statusTypes = StatusAgendamentoType.getAllValues();

  editando: boolean = false;
  titulo!: string;

  constructor(
    private fb: FormBuilder,
    private entidadesService: EntidadesService,
    private voluntariosService: VoluntariosService,
    private _dr: DestroyRef,
    private _dateService: DataService,
    private _horarioService: HorarioService
  ) {
    this.agendamentos = { ...this.agendamento };
    this.agendamentoForm = this.fb.group({
      entidadeId: ['', Validators.required],
      diasVisita: ['', [Validators.required, this._validatorDiaSemana()]],
      horario: ['', Validators.required],
      participanteSelecionado: [''],
      status: [StatusAgendamento.AGUARDANDO_CONFIRMACAO, Validators.required],
    });
  }

  ngOnInit(): void {
    this.entidadesService.read().subscribe((entidades) => {
      this.entidades = entidades;
      this._atualizarEntidadeSelecionada(
        this.agendamentoForm?.get('entidadeId')?.value
      );
      console.log('', this.entidades);
    });
    this.voluntariosService.read().subscribe((voluntarios) => {
      this.voluntarios = voluntarios;
      console.log(voluntarios);
      this.participantes = this.voluntarios.map(
        (voluntario) => voluntario.nome
      );
    });

    this.receberDados();
    this._observaMudancaEntidadeSelecionada();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('modo' in changes) {
      this._atualizarTitulo();
    }
  }

  adicionarParticipante() {
    const idParticipante = this.agendamentoForm.value.participanteSelecionado;
    const estaComoParticipante = this.participantesSelecionados.some(
      (p) => p.id == idParticipante
    );
    const participanteSelecionado = this.voluntarios.find(
      (v) => v.id == idParticipante
    );

    if (idParticipante && !estaComoParticipante && participanteSelecionado) {
      this.participantesSelecionados.push(participanteSelecionado);
    }

    this.agendamentoForm.patchValue({ participanteSelecionado: '' });
  }

  removerParticipante(index: number) {
    this.participantesSelecionados.splice(index, 1);
  }

  onSalvar() {
    const form = this.agendamentoForm.value;
    const participantes = this.participantesSelecionados.map(
      (p) => p.id
    ) as number[];

    const dados: AgendamentoForm = {
      entidadeId: form.entidadeId,
      diasVisita: this._dateService.toString(form.diasVisita) ?? '',
      horario: this._horarioService.toHorario(form.horario),
      participantesIds: participantes,
      status: form.status,
    };

    this.salvar.emit(dados);
  }

  onFechar() {
    this.fechar.emit();
  }

  receberDados() {
    if (this.agendamento) {
      this.editando = true;
      console.log('agendamento na modal', this.agendamento);
      this.participantesSelecionados =
        this.agendamento.listaParticipantes != null
          ? [...this.agendamento.listaParticipantes]
          : [];

      this.agendamentoForm
        .get('entidadeId')
        ?.setValue(this.agendamento.entidade.id);
      this.agendamentoForm
        .get('diasVisita')
        ?.setValue(this._dateService.toDate(this.agendamento.diasVisita));
      this.agendamentoForm
        .get('horario')
        ?.setValue(this._horarioService.toDate(this.agendamento.horario));

      if (this.agendamento.status) {
        this.agendamentoForm.get('status')?.setValue(this.agendamento.status);
      }

      this._atualizarEntidadeSelecionada(
        this.agendamentoForm?.get('entidadeId')?.value
      );
    }
  }

  public isCampoComErro(nomeCampo: string, nomeErro: string) {
    const campo = this.agendamentoForm.get(nomeCampo);
    return campo?.hasError(nomeErro) && campo.touched;
  }

  public isParticipantesInvalidos() {
    return (
      this.agendamentoForm.get('participanteSelecionado')?.touched &&
      this.participantesSelecionados.length == 0
    );
  }

  public getDiasSemanaValidosEntidade(): string | undefined {
    const entidadeId = this.agendamentoForm.get('entidadeId')?.value;
    const entidadeSelecionada = this.entidades.find((e) => e.id == entidadeId);

    return entidadeSelecionada?.diasVisita.join(', ');
  }

  private _atualizarTitulo(): void {
    this.titulo =
      this.modo == ModalAgendamentoModoType.EDICAO
        ? 'Editar Agendamento'
        : 'Novo Agendamento';
  }

  private _validatorDiaSemana() {
    return (control: AbstractControl) => {
      const data = control.value as Date;

      if (!data) {
        return null;
      }

      const entidadeId = this.agendamentoForm.get('entidadeId')?.value;
      const entidadeSelecionada = this.entidades?.find(
        (e) => e.id == entidadeId
      );

      if (!entidadeSelecionada) {
        return null;
      }

      const diaDaSemana = DiaSemanaType.getPorDiaDaSemana(data.getDay());

      if (!diaDaSemana) {
        return null;
      }

      const diaSelecionadoValido = entidadeSelecionada.diasVisita.includes(
        diaDaSemana?.descricao
      );

      return diaSelecionadoValido ? null : { diaDaSemanaInvalido: true };
    };
  }

  /**
   * Observa a mudança do campo de entidade, pois quando ela é modificada, é necessário modificar os horários
   * disponíveis para aquela entidade
   */
  private _observaMudancaEntidadeSelecionada(): void {
    this.agendamentoForm
      .get('entidadeId')
      ?.valueChanges.pipe(takeUntilDestroyed(this._dr))
      .subscribe((idEntidadeSelecionada: number) => {
        this._atualizarEntidadeSelecionada(idEntidadeSelecionada);
        this.entidadeSelecionada = this.entidades.find(
          (e) => e.id == idEntidadeSelecionada
        );
      });
  }

  private _atualizarEntidadeSelecionada(id?: number | null): void {
    this.entidadeSelecionada = this.entidades?.find((e) => e.id == id);
  }
}
