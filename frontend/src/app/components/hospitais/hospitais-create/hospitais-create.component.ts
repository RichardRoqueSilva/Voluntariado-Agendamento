import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HospitaisService } from '../hospitais.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Hospitais } from '../hospitais.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hospitais-create',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './hospitais-create.component.html',
  styleUrl: './hospitais-create.component.css',
  standalone: true,
})
export class HospitaisCreateComponent implements OnInit{

  hospitais: Hospitais = {
    nome: '',
    diasVisita: "00-00-0000",
  }
  constructor(private hospitaisService: HospitaisService,
    private router: Router
  ){}
    ngOnInit(): void{
  }

  createHospitais(): void {
    this.hospitaisService.create(this.hospitais).subscribe(hospitais =>{
      this.hospitaisService.showMessage('Voluntário Cadastrado')
      this.router.navigate(['/hospitais'])
  })
}
  cancel(): void {
    this.router.navigate(['/hospitais'])
  }
}


