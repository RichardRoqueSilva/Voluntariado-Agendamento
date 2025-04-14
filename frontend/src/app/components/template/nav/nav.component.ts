import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from '../../../views/home/home.component';
import { VoluntariosCrudComponent } from '../../../views/voluntarios-crud/voluntarios-crud.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VoluntariosCreateComponent } from '../../voluntarios/voluntarios-create/voluntarios-create.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, RouterModule, MatSidenavModule, MatListModule, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}