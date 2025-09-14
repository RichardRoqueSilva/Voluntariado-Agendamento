import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgendamentosService } from '../agendamentos.service';
import { AgendamentoForm } from '../models/agendamentos-form.model';
import { Agendamentos } from '../models/agendamentos.model';

@Component({
  selector: 'app-agendamentos-update',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './agendamentos-update.component.html',
  styleUrl: './agendamentos-update.component.css',
  standalone: true,
})
export class AgendamentosUpdateComponent implements OnInit {

  agendamentos!: Agendamentos //indica que sera inicializada antes do uso "!"

  constructor(
    private agendamentosService: AgendamentosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''//garanti que nunca sera null
    this.agendamentosService.readById(id).subscribe(Agendamentos => {
      this.agendamentos = Agendamentos
    })
  }

  updateAgendamentos(): void {
    const participantesIds = this.agendamentos.listaParticipantes?.map( p => p.id) as number[]
    const agendamentoForm: AgendamentoForm = {
      diasVisita: this.agendamentos.diasVisita,
      horario: this.agendamentos.horario as string,
      entidadeId: this.agendamentos.id as number,
      participantesIds: participantesIds 
    }
    this.agendamentosService.update(this.agendamentos.id as number, agendamentoForm).subscribe(() =>{
      this.agendamentosService.showMessage('Agendamento atualizado com sucesso!')
        this.router.navigate(['/agendamentos']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/agendamentos'])
  }
}
