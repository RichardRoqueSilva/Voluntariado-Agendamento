import { VoluntariosService } from '../voluntarios.service';
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
import { Voluntarios } from '../voluntarios.model';

@Component({
  selector: 'app-voluntarios-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './voluntarios-delete.component.html',
  styleUrl: './voluntarios-delete.component.css',
  standalone: true,
})
export class VoluntariosDeleteComponent implements OnInit{

  voluntarios!: Voluntarios

  constructor(private voluntariosService: VoluntariosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ??''
    this.voluntariosService.readById(id).subscribe(voluntarios => {
      this.voluntarios = voluntarios
    });
      
  }
  deleteVoluntarios(): void {
    this.voluntariosService.delete(this.voluntarios.id ?? 0).subscribe(() => {
      this.voluntariosService.showMessage('Voluntário excluido com sucesso!')
      this.router.navigate(["/voluntarios"]);
    });

  }

  cancel(): void {
    this.router.navigate(['/voluntarios'])
    
  }

}
