import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SharedModule } from '../../../shared';
import { SimpleIndicatorComponent } from '../../../shared/components/simple-indicator/simple-indicator.component';
import { DashboardFilters } from '../models/dashboard-filters';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-simple-indicators',
  standalone: true,
  imports: [
    CommonModule,
    SimpleIndicatorComponent,
    SharedModule
  ],
  templateUrl: './dashboard-simple-indicators.component.html',
  styleUrl: './dashboard-simple-indicators.component.css'
})
export class DashboardSimpleIndicatorsComponent implements OnChanges{

  @Input()
  filters!: DashboardFilters

  qtdeEntidadesVisitadas$: Observable<number> = of(0)
  qtdeParticipantesVisitas$: Observable<number> = of(0)
  qtdeNaoParticipantesVisitas$: Observable<number> = of(0)
  taxaParticipacao$: Observable<number> = of(0)
  horasVisitas$: Observable<number> = of(0)

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if('filters' in changes) {
      this.buscarDadosIndicadores()
    }
  }

  buscarDadosIndicadores(): void {
    this.qtdeEntidadesVisitadas$ = this.dashboardService.getQuantidadeEntidadesVisitadas(this.filters)
    this.qtdeParticipantesVisitas$ = this.dashboardService.getQuantidadeVoluntariosVisitas(this.filters)
    this.qtdeNaoParticipantesVisitas$ = this.dashboardService.getQuantidadeVoluntariosNaoParticipantesVisitas(this.filters)
    this.taxaParticipacao$ = this.dashboardService.getTaxaParticipacao(this.filters)
    this.horasVisitas$ = this.dashboardService.getHorasVisitas(this.filters)
  }
}
