import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent implements OnInit{

  constructor(private headerService: HeaderService){
    headerService.headerData = {
      title: 'Inicio',
      icon: 'home',
      routeUrl: ''
    }

  }
  ngOnInit(): void {
      
  }

}
