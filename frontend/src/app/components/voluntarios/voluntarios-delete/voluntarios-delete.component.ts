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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VoluntarioRole, Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatSelectModule],
  templateUrl: './voluntarios-delete.component.html',
  styleUrl: './voluntarios-delete.component.css',
  standalone: true,
})
export class VoluntariosDeleteComponent implements OnInit{

  voluntarios!: Voluntarios

  protected roles = VoluntarioRole

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
