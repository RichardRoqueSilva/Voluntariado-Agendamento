import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Entidades } from '../models/entidades.model';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './entidades-read.component.html',
  styleUrls: ['./entidades-read.component.css',],
  standalone: true,
})
export class EntidadesReadComponent implements OnInit{

  entidades: Entidades[] = []
  displayedColumns = ['nome', 'endereco', 'responsavel', 'telefone', 'dias', 'horario', 'action']

  constructor(private entidadesService: EntidadesService){}

  ngOnInit(): void {
    this.entidadesService.read().subscribe(Entidades => {
      this.entidades = Entidades
      console.log(Entidades)
    })

  }

}
