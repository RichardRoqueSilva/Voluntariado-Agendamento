import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { VoluntarioRole, Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios-create',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  templateUrl: './voluntarios-create.component.html',
  styleUrls: ['./voluntarios-create.component.css'],
  standalone: true,
})
export class VoluntariosCreateComponent {
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
    private router: Router
  ) {}

  createVoluntarios(): void {
    this.voluntariosService.create(this.voluntarios).subscribe(() => {
      this.voluntariosService.showMessage('Voluntário Cadastrado');
      this.router.navigate(['/voluntarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/voluntarios']);
  }
}
