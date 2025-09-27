import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { VoluntarioRole, Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios-delete',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NgxMaskPipe,
  ],
  templateUrl: './voluntarios-delete.component.html',
  styleUrl: './voluntarios-delete.component.css',
  standalone: true,
})
export class VoluntariosDeleteComponent implements OnInit {
  public voluntarios: Voluntarios = {
    nome: '',
    celular: '',
    email: '',
    observacao: '',
    login: '',
    senha: '',
    role: VoluntarioRole.USER,
  };

  protected roles = VoluntarioRole;

  constructor(
    private voluntariosService: VoluntariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.voluntariosService.readById(id).subscribe((voluntarios) => {
      this.voluntarios = voluntarios;
    });
  }

  deleteVoluntarios(): void {
    this.voluntariosService.delete(this.voluntarios.id ?? 0).subscribe(() => {
      this.voluntariosService.showMessage('Voluntário excluido com sucesso!');
      this.router.navigate(['/voluntarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/voluntarios']);
  }
}
