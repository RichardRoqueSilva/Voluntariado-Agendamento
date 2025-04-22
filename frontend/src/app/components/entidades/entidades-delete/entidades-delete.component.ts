import { EntidadesService } from '../entidades.service';
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
import { Entidades } from '../entidades.model';

@Component({
  selector: 'app-entidades-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './entidades-delete.component.html',
  styleUrl: './entidades-delete.component.css',
  standalone: true,
})
export class EntidadesDeleteComponent implements OnInit{

  entidades!: Entidades

  constructor(private entidadesService: EntidadesService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ??''
    this.entidadesService.readById(id).subscribe(entidades => {
      this.entidades = entidades
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
