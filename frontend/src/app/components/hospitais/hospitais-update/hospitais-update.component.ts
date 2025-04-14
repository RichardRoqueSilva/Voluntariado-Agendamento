import { HospitaisService } from '../hospitais.service';
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
import { Hospitais } from '../hospitais.model';

@Component({
  selector: 'app-hospitais-update',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './hospitais-update.component.html',
  styleUrl: './hospitais-update.component.css',
  standalone: true,
})
export class HospitaisUpdateComponent implements OnInit {

  hospitais!: Hospitais //indica que sera inicializada antes do uso "!"

  constructor(
    private hospitaisService: HospitaisService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''//garanti que nunca sera null
    this.hospitaisService.readById(id).subscribe(Hospitais => {
      this.hospitais = Hospitais
    })
  }

  updateHospitais(): void {
    this.hospitaisService.update(this.hospitais).subscribe(() =>{
      this.hospitaisService.showMessage('Hospital atualizado com sucesso!')
        this.router.navigate(['/hospitais']);  
    });
  }

  cancel(): void {
    this.router.navigate(['/hospitais'])
  }
}
