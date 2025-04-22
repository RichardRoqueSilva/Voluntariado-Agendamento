import { Entidades } from '../entidades.model';
import { EntidadesService } from '../entidades.service';
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
import { EntidadesDeleteComponent } from '../entidades-delete/entidades-delete.component';
import { EntidadesUpdateComponent } from '../entidades-update/entidades-update.component';
import { EntidadesCreateComponent } from '../entidades-create/entidades-create.component';

@Component({
  selector: 'app-entidades-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule,],
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
