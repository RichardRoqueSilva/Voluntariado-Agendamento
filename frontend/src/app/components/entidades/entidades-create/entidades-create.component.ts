import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-create',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTimepickerModule,
    NgxMaskDirective,
  ],
  templateUrl: './entidades-create.component.html',
  styleUrl: './entidades-create.component.css',
  standalone: true,
})
export class EntidadesCreateComponent {
  entidades: EntidadesFormModel = {
    nome: '',
    endereco: '',
    responsavel: '',
    telefone: '',
    diasVisita: [],
    horarioInicioVisita: null,
    horarioFimVisita: null,
  };

  diasDaSemana = DiaSemanaType.getAllValues();

  constructor(
    private entidadesService: EntidadesService,
    private entidadeMapperService: EntidadesMapperService,
    private router: Router
  ) {}

  createEntidades(): void {
    this.entidadesService
      .create(this.entidadeMapperService.toAPI(this.entidades))
      .subscribe((entidades) => {
        this.entidadesService.showMessage('Entidade Cadastrada');
        this.router.navigate(['/entidades']);
      });
  }

  cancel(): void {
    this.router.navigate(['/entidades']);
  }
}
