import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Boa prática importar
import { MatListModule } from '@angular/material/list'; // Necessário para mat-nav-list
import { RouterModule } from '@angular/router';      // Necessário para routerLink

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,     // Adicionado
    RouterModule,     // Mantido e necessário
    MatListModule     // Mantido e necessário
   // MatCardModule,  // Removido (provavelmente desnecessário)
   // MatButtonModule, // Removido (provavelmente desnecessário)
   // MatSidenavModule,// Removido (incorreto aqui)
   // RouterOutlet    // Removido (incorreto aqui)
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'], // Correto
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}