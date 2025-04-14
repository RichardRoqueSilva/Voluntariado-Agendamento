import { Voluntarios } from './../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';
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
import { VoluntariosDeleteComponent } from '../voluntarios-delete/voluntarios-delete.component';
import { VoluntariosUpdateComponent } from '../voluntarios-update/voluntarios-update.component';
import { VoluntariosCreateComponent } from '../voluntarios-create/voluntarios-create.component';

@Component({
  selector: 'app-voluntarios-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule,],
  templateUrl: './voluntarios-read.component.html',
  styleUrls: ['./voluntarios-read.component.css',],
  standalone: true,
})
export class VoluntariosReadComponent implements OnInit{

  voluntarios: Voluntarios[] = []
  displayedColumns = ['nome', 'celular', 'nascimento', 'cidade', 'action']

  constructor(private voluntariosService: VoluntariosService){}

  ngOnInit(): void {
    this.voluntariosService.read().subscribe(voluntarios => {
      this.voluntarios = voluntarios
      console.log(voluntarios)
    })
      
  }

}
