import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { VoluntariosService } from '../voluntarios.service';
import { Voluntarios } from './../voluntarios.model';

@Component({
  selector: 'app-voluntarios-read',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    NgxMaskPipe,
    MatTooltipModule,
  ],
  templateUrl: './voluntarios-read.component.html',
  styleUrls: ['./voluntarios-read.component.css'],
  standalone: true,
})
export class VoluntariosReadComponent implements OnInit {
  voluntarios: Voluntarios[] = [];
  displayedColumns = ['nome', 'celular', 'observacao', 'action'];

  constructor(private voluntariosService: VoluntariosService) {}

  ngOnInit(): void {
    this.voluntariosService.read().subscribe((voluntarios) => {
      this.voluntarios = voluntarios;
      console.log(voluntarios);
    });
  }
}
