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
    const id = this.route.snapshot.paramMap.get('id') ??''
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
