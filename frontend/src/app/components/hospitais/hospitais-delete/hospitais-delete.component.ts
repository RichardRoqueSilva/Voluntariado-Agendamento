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
  selector: 'app-hospitais-delete',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
    MatButtonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './hospitais-delete.component.html',
  styleUrl: './hospitais-delete.component.css',
  standalone: true,
})
export class HospitaisDeleteComponent implements OnInit{

  hospitais!: Hospitais

  constructor(private hospitaisService: HospitaisService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ??''
    this.hospitaisService.readById(id).subscribe(hospitais => {
      this.hospitais = hospitais
    });
      
  }
  deleteHospitais(): void {
    this.hospitaisService.delete(this.hospitais.id ?? 0).subscribe(() => {
      this.hospitaisService.showMessage('Hospital excluido com sucesso!')
      this.router.navigate(["/hospitais"]);
    });

  }

  cancel(): void {
    this.router.navigate(['/hospitais'])
    
  }

}
