import { Hospitais } from './../hospitais.model';
import { HospitaisService } from '../hospitais.service';
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
import { HospitaisDeleteComponent } from '../hospitais-delete/hospitais-delete.component';
import { HospitaisUpdateComponent } from '../hospitais-update/hospitais-update.component';
import { HospitaisCreateComponent } from '../hospitais-create/hospitais-create.component';

@Component({
  selector: 'app-hospitais-read',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule,
    MatTableModule,],
  templateUrl: './hospitais-read.component.html',
  styleUrls: ['./hospitais-read.component.css',],
  standalone: true,
})
export class HospitaisReadComponent implements OnInit{

  hospitais: Hospitais[] = []
  displayedColumns = ['nome', 'visita', 'action']

  constructor(private hospitaisService: HospitaisService){}

  ngOnInit(): void {
    this.hospitaisService.read().subscribe(Hospitais => {
      this.hospitais = Hospitais
      console.log(Hospitais)
    })
      
  }

}
