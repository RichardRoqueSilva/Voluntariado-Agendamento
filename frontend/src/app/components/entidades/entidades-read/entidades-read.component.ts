import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { Entidades } from '../models/entidades.model';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-read',
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    NgxMaskPipe,
    MatTooltipModule,
  ],
  templateUrl: './entidades-read.component.html',
  styleUrls: ['./entidades-read.component.css'],
  standalone: true,
})
export class EntidadesReadComponent implements OnInit {
  entidades: Entidades[] = [];
  displayedColumns = [
    'nome',
    'endereco',
    'responsavel',
    'telefone',
    'dias',
    'horario',
    'action',
  ];

  constructor(private entidadesService: EntidadesService) {}

  ngOnInit(): void {
    this.entidadesService.read().subscribe((entidades) => {
      this.entidades = entidades;
      console.log(entidades);
    });
  }
}
