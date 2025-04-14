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
  selector: 'app-voluntarios-update',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './voluntarios-update.component.html',
  styleUrl: './voluntarios-update.component.css',
  standalone: true,
})
export class VoluntariosUpdateComponent implements OnInit {

  voluntarios!: Voluntarios //indica que sera inicializada antes do uso "!"

  constructor(
    private voluntariosService: VoluntariosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''//garanti que nunca sera null
    this.voluntariosService.readById(id).subscribe(voluntarios => {
      this.voluntarios = voluntarios
    })
  }

  updateVoluntarios(): void {
    this.voluntariosService.update(this.voluntarios).subscribe(() =>{
      this.voluntariosService.showMessage('Voluntário atualizado com sucesso!')
        this.router.navigate(['/voluntarios']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/voluntarios'])
  }
}
