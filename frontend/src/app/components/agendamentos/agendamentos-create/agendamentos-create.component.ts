import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AgendamentosService } from '../agendamentos.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Agendamentos } from '../agendamentos.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-agendamentos-create',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './agendamentos-create.component.html',
  styleUrl: './agendamentos-create.component.css',
  standalone: true,
})
export class AgendamentosCreateComponent implements OnInit{

  agendamentos: Agendamentos = {
    nome: '',
    diasVisita: "00-00-0000",
  }
  constructor(private agendamentosService: AgendamentosService,
    private router: Router
  ){}
    ngOnInit(): void{
  }

  createAgendamentos(): void {
    this.agendamentosService.create(this.agendamentos).subscribe(agendamentos =>{
      this.agendamentosService.showMessage('Agendamento realizado com sucesso')
      this.router.navigate(['/agendamentos'])
  })
}
  cancel(): void {
    this.router.navigate(['/agendamentos'])
  }
}


