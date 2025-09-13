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
import { VoluntariosService } from '../voluntarios.service';
import { Voluntarios } from './../voluntarios.model';

@Component({
  selector: 'app-voluntarios-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './voluntarios-read.component.html',
  styleUrls: ['./voluntarios-read.component.css',],
  standalone: true,
})
export class VoluntariosReadComponent implements OnInit{

  voluntarios: Voluntarios[] = []
  displayedColumns = ['nome', 'celular', 'observacao', 'action']

  constructor(private voluntariosService: VoluntariosService){}

  ngOnInit(): void {
    this.voluntariosService.read().subscribe(voluntarios => {
      this.voluntarios = voluntarios
      console.log(voluntarios)
    })
      
  }

}
