import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  data = new FormControl(new Date());

  constructor(private _headerService: HeaderService) {}
  
  ngOnInit(): void {
    this._headerService.headerData = {
      title: 'Dashboard',
      icon: 'bar_chart',
      routeUrl: '/dashboard',
    };
  }

  public setMesAnalise(mesAnalise: Date, datepicker: MatDatepicker<Date>) {
    console.log(mesAnalise);
    const ctrlValue = this.data.value ?? new Date();
    ctrlValue.setMonth(mesAnalise.getMonth());
    ctrlValue.setFullYear(mesAnalise.getFullYear());
    this.data.setValue(ctrlValue);
    datepicker.close();
  }
}
