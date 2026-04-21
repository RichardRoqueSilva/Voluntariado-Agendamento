import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_NATIVE_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardChartIndicatorsComponent } from '../../components/dashboard/dashboard-chart-indicators/dashboard-chart-indicators.component';
import { DashboardSimpleIndicatorsComponent } from '../../components/dashboard/dashboard-simple-indicators/dashboard-simple-indicators.component';
import { DashboardFilters } from '../../components/dashboard/models/dashboard-filters';
import { HeaderService } from '../../components/template/header/header.service';

export const FORMATO_DATA: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: { year: 'numeric', month: 'numeric' },
  },
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,

    DashboardSimpleIndicatorsComponent,
    DashboardChartIndicatorsComponent,
  ],
  providers: [provideNativeDateAdapter(FORMATO_DATA)],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public dateMonthAnalysis = new Date();
  public filters!: DashboardFilters;
  constructor(private _headerService: HeaderService) {}

  ngOnInit(): void {
    this._headerService.headerData = {
      title: 'Dashboard',
      icon: 'bar_chart',
      routeUrl: '/dashboard',
    };

    this.updateFilters();
  }

  public setMonthAnalysis(
    monthAnalysis: Date,
    datepicker: MatDatepicker<Date>
  ) {
    this.dateMonthAnalysis = monthAnalysis;
    this.updateFilters();
    datepicker.close();
  }

  protected updateFilters() {
    this.filters = {
      mes: this.dateMonthAnalysis.getMonth() + 1,
      ano: this.dateMonthAnalysis.getFullYear(),
    };
  }
}
