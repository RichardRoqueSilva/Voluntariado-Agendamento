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
  selector: 'app-entidades-update',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './entidades-update.component.html',
  styleUrl: './entidades-update.component.css',
  standalone: true,
})
export class EntidadesUpdateComponent implements OnInit {

  entidades!: Entidades //indica que sera inicializada antes do uso "!"

  constructor(
    private entidadesService: EntidadesService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''//garanti que nunca sera null
    this.entidadesService.readById(id).subscribe(Entidades => {
      this.entidades = Entidades
    })
  }

  updateEntidades(): void {
    this.entidadesService.update(this.entidades).subscribe(() =>{
      this.entidadesService.showMessage('Entidade atualizada com sucesso!')
        this.router.navigate(['/entidades']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/entidades'])
  }
}
