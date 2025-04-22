import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { EntidadesService } from '../entidades.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Entidades } from '../entidades.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-entidades-create',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './entidades-create.component.html',
  styleUrl: './entidades-create.component.css',
  standalone: true,
})
export class EntidadesCreateComponent implements OnInit{

  entidades: Entidades = {
    nome: '',
    endereco: '',
    responsavel: '',
    telefone: '',
    diasVisita: '',
    horarioVisita: '',
  }
  constructor(private entidadesService: EntidadesService,
    private router: Router
  ){}
    ngOnInit(): void{
  }

  createEntidades(): void {
    this.entidadesService.create(this.entidades).subscribe(entidades =>{
      this.entidadesService.showMessage('Entidade Cadastrada')
      this.router.navigate(['/entidades'])
  })
}
  cancel(): void {
    this.router.navigate(['/entidades'])
  }
}


