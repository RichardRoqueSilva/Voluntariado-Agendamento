import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';
import { VoluntariosReadComponent } from '../../components/voluntarios/voluntarios-read/voluntarios-read.component';

@Component({
  selector: 'app-voluntarios-crud',
  imports: [CommonModule, MatButtonModule, VoluntariosReadComponent],
  templateUrl: './voluntarios-crud.component.html',
  styleUrl: './voluntarios-crud.component.css',
  standalone: true,
})
export class VoluntariosCrudComponent {
  constructor(private router: Router, headerService: HeaderService) {
    headerService.headerData = {
      title: 'Voluntários',
      icon: 'volunteer_activism',
      routeUrl: '/voluntarios',
    };
  }

  navigateToVoluntariosCreate(): void {
    this.router.navigate(['/voluntarios/create']);
  }
}
