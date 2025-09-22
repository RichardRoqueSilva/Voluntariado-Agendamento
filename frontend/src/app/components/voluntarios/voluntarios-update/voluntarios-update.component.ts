import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { VoluntarioRole, Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios-update',
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
  templateUrl: './voluntarios-update.component.html',
  styleUrl: './voluntarios-update.component.css',
  standalone: true,
})
export class VoluntariosUpdateComponent implements OnInit {
  protected voluntarios: Voluntarios = {
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
    const id = this.route.snapshot.paramMap.get('id') ?? ''; //garanti que nunca sera null
    this.voluntariosService.readById(id).subscribe((voluntarios) => {
      this.voluntarios = voluntarios;
    });
  }

  updateVoluntarios(): void {
    this.voluntariosService.update(this.voluntarios).subscribe(() => {
      this.voluntariosService.showMessage('Voluntário atualizado com sucesso!');
      this.router.navigate(['/voluntarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/voluntarios']);
  }
}
