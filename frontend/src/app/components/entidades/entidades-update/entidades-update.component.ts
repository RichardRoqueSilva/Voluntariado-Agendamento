import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-update',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTimepickerModule,
    NgxMaskDirective,
  ],
  templateUrl: './entidades-update.component.html',
  styleUrl: './entidades-update.component.css',
  standalone: true,
})
export class EntidadesUpdateComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''; //garanti que nunca sera null
    this.entidadesService.readById(id).subscribe((entidades) => {
      this.entidades = this.entidadeMapperService.toForm(entidades);
    });
  }

  updateEntidades(): void {
    this.entidadesService
      .update(this.entidadeMapperService.toAPI(this.entidades))
      .subscribe(() => {
        this.entidadesService.showMessage('Entidade atualizada com sucesso!');
        this.router.navigate(['/entidades']);
      });
  }

  cancel(): void {
    this.router.navigate(['/entidades']);
  }
}
