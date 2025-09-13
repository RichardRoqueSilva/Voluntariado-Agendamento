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
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DiaSemanaType } from '../models/dia-semana-type.model';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { EntidadesMapperService } from '../services/entidades-mapper.service';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-entidades-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatSelectModule,
            MatTimepickerModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './entidades-delete.component.html',
  styleUrl: './entidades-delete.component.css',
  standalone: true,
})
export class EntidadesDeleteComponent implements OnInit{

  entidades: EntidadesFormModel = {
    nome: '',
    endereco: '',
    responsavel: '',
    telefone: '',
    diasVisita: [],
    horarioInicioVisita: null,
    horarioFimVisita: null,
  }

  diasDaSemana = DiaSemanaType.getAllValues()

  constructor(private entidadesService: EntidadesService,
    private entidadeMapperService: EntidadesMapperService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ??''
    this.entidadesService.readById(id).subscribe(entidades => {
      this.entidades = this.entidadeMapperService.toForm(entidades)
    });
  }

  deleteEntidades(): void {
    this.entidadesService.delete(this.entidades.id ?? 0).subscribe(() => {
      this.entidadesService.showMessage('Entidade excluida com sucesso!')
      this.router.navigate(["/entidades"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/entidades'])
  }

}
