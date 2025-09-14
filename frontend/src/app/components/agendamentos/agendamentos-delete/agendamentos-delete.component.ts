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
import { Agendamentos } from '../models/agendamentos.model';

@Component({
  selector: 'app-agendamentos-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './agendamentos-delete.component.html',
  styleUrl: './agendamentos-delete.component.css',
  standalone: true,
})
export class AgendamentosDeleteComponent implements OnInit{

  agendamentos!: Agendamentos

  constructor(private agendamentosService: AgendamentosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''
    this.agendamentosService.readById(id).subscribe(agendamentos => {
      this.agendamentos = agendamentos
    });
      
  }
  deleteAgendamentos(): void {
    this.agendamentosService.delete(this.agendamentos.id ?? 0).subscribe(() => {
      this.agendamentosService.showMessage('Entidade excluida com sucesso!')
      this.router.navigate(["/agendamentos"]);
    });

  }

  cancel(): void {
    this.router.navigate(['/agendamentos'])
    
  }

}
