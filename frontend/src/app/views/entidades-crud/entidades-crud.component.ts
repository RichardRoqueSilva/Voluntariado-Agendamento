import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EntidadesReadComponent } from '../../components/entidades/entidades-read/entidades-read.component';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-entidades-crud',
  imports: [MatButtonModule, EntidadesReadComponent, MatSortModule],
  templateUrl: './entidades-crud.component.html',
  styleUrl: './entidades-crud.component.css',
  standalone: true,
})
export class EntidadesCrudComponent implements OnInit {
  constructor(private router: Router, headerService: HeaderService) {
    headerService.headerData = {
      title: 'Entidades',
      icon: 'local_hospital',
      routeUrl: '/entidades',
    };
  }

  ngOnInit(): void {}
  navigateToEntidadesCreate(): void {
    this.router.navigate(['/entidades/create']);
  }
}
