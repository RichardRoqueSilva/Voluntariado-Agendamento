import { title } from 'process';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',],
  standalone: true
})
export class HeaderComponent implements OnInit{

  constructor(private headerService: HeaderService){

  }
  ngOnInit(): void {
      
  }

  get title(): string{
    return this.headerService.headerData.title
  }

  get icon(): string{
    return this.headerService.headerData.icon
  }

  get routeUrl(): string{
    return this.headerService.headerData.routeUrl
  }
}
