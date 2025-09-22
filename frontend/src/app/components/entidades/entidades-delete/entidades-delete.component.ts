import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-delete',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTimepickerModule,
    NgxMaskPipe,
  ],
  templateUrl: './entidades-delete.component.html',
  styleUrl: './entidades-delete.component.css',
  standalone: true,
})
export class EntidadesDeleteComponent implements OnInit {
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
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.entidadesService.readById(id).subscribe((entidades) => {
      this.entidades = this.entidadeMapperService.toForm(entidades);
    });
  }

  deleteEntidades(): void {
    this.entidadesService.delete(this.entidades.id ?? 0).subscribe(() => {
      this.entidadesService.showMessage('Entidade excluida com sucesso!');
      this.router.navigate(['/entidades']);
    });
  }

  cancel(): void {
    this.router.navigate(['/entidades']);
  }
}
