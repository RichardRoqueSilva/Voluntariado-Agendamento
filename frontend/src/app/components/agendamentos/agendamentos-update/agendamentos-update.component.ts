import { AgendamentosService } from '../agendamentos.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Agendamentos } from '../agendamentos.model';

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
    this.agendamentosService.update(this.agendamentos).subscribe(() =>{
      this.agendamentosService.showMessage('Agendamento atualizado com sucesso!')
        this.router.navigate(['/agendamentos']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/agendamentos'])
  }
}
