import { CommonModule } from '@angular/common'; // Boa prática importar
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Necessário para mat-nav-list
import { RouterModule } from '@angular/router'; // Necessário para routerLink

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {}
