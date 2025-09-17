import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AgendamentosService } from '../agendamentos.service';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { StatusAgendamento } from '../models/status-agendamento-type.model';

@Component({
  selector: 'app-agendamentos-create',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './agendamentos-create.component.html',
  styleUrl: './agendamentos-create.component.css',
  standalone: true,
})
export class AgendamentosCreateComponent implements OnInit{

  agendamentos: AgendamentoForm = {
    entidadeId: 0,
    diasVisita: "00-00-0000",
    horario: '',
    participantesIds:[],
    status: StatusAgendamento.AGUARDANDO_CONFIRMACAO
  }

  constructor(private agendamentosService: AgendamentosService,
    private router: Router
  ){}
    ngOnInit(): void{
  }

  createAgendamentos(): void {
    this.agendamentosService.create(this.agendamentos).subscribe(() =>{
      this.agendamentosService.showMessage('Agendamento realizado com sucesso')
      this.router.navigate(['/agendamentos'])
  })
}
  cancel(): void {
    this.router.navigate(['/agendamentos'])
  }
}


