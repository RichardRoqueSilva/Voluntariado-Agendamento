import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { VoluntarioRole, Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios-update',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatSelectModule, NgxMaskDirective],
  providers: [provideNgxMask()],
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
    login:'',
    senha:'',
    role: VoluntarioRole.USER
  }

  protected roles = VoluntarioRole

  constructor(
    private voluntariosService: VoluntariosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''//garanti que nunca sera null
    this.voluntariosService.readById(id).subscribe(voluntarios => {
      this.voluntarios = voluntarios
    })
  }

  updateVoluntarios(): void {
    this.voluntariosService.update(this.voluntarios).subscribe(() =>{
      this.voluntariosService.showMessage('Voluntário atualizado com sucesso!')
        this.router.navigate(['/voluntarios']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/voluntarios'])
  }
}
