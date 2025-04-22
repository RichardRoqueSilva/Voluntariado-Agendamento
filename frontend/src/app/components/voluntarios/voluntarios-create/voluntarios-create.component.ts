import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { VoluntariosService } from '../voluntarios.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Voluntarios } from '../voluntarios.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-voluntarios-create',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, NgxMaskDirective
          ],
  providers: [provideNgxMask()],
  templateUrl: './voluntarios-create.component.html',
  styleUrls: ['./voluntarios-create.component.css'],
  standalone: true,
})
export class VoluntariosCreateComponent implements OnInit{

  voluntarios: Voluntarios = {
    nome: '',
    celular: '',
    observacao: '',
    login:'',
    senha:'',
  }
  constructor(private voluntariosService: VoluntariosService,
    private router: Router
  ){}
    ngOnInit(): void{
  }

  createVoluntarios(): void {
    this.voluntariosService.create(this.voluntarios).subscribe(voluntarios =>{
      this.voluntariosService.showMessage('Voluntário Cadastrado')
      this.router.navigate(['/voluntarios'])
  })
}
  cancel(): void {
    this.router.navigate(['/voluntarios'])
  }
}


