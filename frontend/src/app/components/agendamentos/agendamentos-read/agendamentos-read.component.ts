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

@Component({
  selector: 'app-agendamentos-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule,],
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css',],
  standalone: true,
})
export class AgendamentosReadComponent implements OnInit{

  agendamentos: Agendamentos[] = []
  displayedColumns = ['nome', 'visita', 'action']

  constructor(private agendamentosService: AgendamentosService){}

  ngOnInit(): void {
    this.agendamentosService.read().subscribe(Agendamentos => {
      this.agendamentos = Agendamentos
      console.log(Agendamentos)
    })
      
  }

}
