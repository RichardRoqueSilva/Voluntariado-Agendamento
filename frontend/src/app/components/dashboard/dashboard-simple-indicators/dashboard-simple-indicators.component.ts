import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { SharedModule } from '../../../shared';
import { HorizontalChartBarIndicatorComponent } from '../../../shared/components/horizontal-chart-bar-indicator/horizontal-chart-bar-indicator.component';
import { SimpleIndicatorComponent } from '../../../shared/components/simple-indicator/simple-indicator.component';
import { DashboardHorizontalChartBarData } from '../models';
import { DashboardFilters } from '../models/dashboard-filters';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-simple-indicators',
  standalone: true,
  imports: [
    CommonModule,
    SimpleIndicatorComponent,
    HorizontalChartBarIndicatorComponent,
    SharedModule,
  ],
  templateUrl: './dashboard-simple-indicators.component.html',
  styleUrl: './dashboard-simple-indicators.component.css',
})
export class DashboardSimpleIndicatorsComponent implements OnChanges {
  @Input()
  filters!: DashboardFilters;

  qtdeEntidadesVisitadas$: Observable<number> = of(0);
  qtdeParticipantesVisitas$: Observable<number> = of(0);
  qtdeNaoParticipantesVisitas$: Observable<number> = of(0);
  taxaParticipacao$: Observable<number> = of(0);
  horasVisitas$: Observable<number> = of(0);
  visitasPorEntidade$: Observable<DashboardHorizontalChartBarData[]> = of([]);

  qtdeEntidadesVisitadasLoading = signal(true);
  qtdeParticipantesVisitasLoading = signal(true);
  qtdeNaoParticipantesVisitasLoading = signal(true);
  taxaParticipacaoLoading = signal(true);
  horasVisitasLoading = signal(true);
  visitasPorEntidadeLoading = signal(true);

  visitasPorVoluntario$: Observable<DashboardHorizontalChartBarData[]> = of([]);
  visitasPorVoluntarioLoading = signal(true);

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('filters' in changes) {
      this.buscarDadosIndicadores();
    }
  }

  buscarDadosIndicadores(): void {
    this.buscaQtdeEntidadesVisitadas();
    this.buscaQtdeVoluntariosVisitas();
    this.buscaQtdeNaoParticipantesVisitas();
    this.buscaTaxaParticipacao();
    this.buscaHorasVisitas();
    this.buscaVisitarPorEntidade();
    this.buscaVisitarPorVoluntario();
  }

  buscaQtdeEntidadesVisitadas(): void {
    this.qtdeEntidadesVisitadas$ = this.dashboardService
      .getQuantidadeEntidadesVisitadas(this.filters)
      .pipe(finalize(() => this.qtdeEntidadesVisitadasLoading.set(false)));
    this.qtdeEntidadesVisitadasLoading.set(true);
  }

  buscaQtdeVoluntariosVisitas(): void {
    this.qtdeParticipantesVisitas$ = this.dashboardService
      .getQuantidadeVoluntariosVisitas(this.filters)
      .pipe(finalize(() => this.qtdeParticipantesVisitasLoading.set(false)));
    this.qtdeParticipantesVisitasLoading.set(true);
  }

  buscaQtdeNaoParticipantesVisitas(): void {
    this.qtdeNaoParticipantesVisitas$ = this.dashboardService
      .getQuantidadeVoluntariosNaoParticipantesVisitas(this.filters)
      .pipe(finalize(() => this.qtdeNaoParticipantesVisitasLoading.set(false)));

    this.qtdeNaoParticipantesVisitasLoading.set(true);
  }

  buscaTaxaParticipacao(): void {
    this.taxaParticipacao$ = this.dashboardService
      .getTaxaParticipacao(this.filters)
      .pipe(finalize(() => this.taxaParticipacaoLoading.set(false)));

    this.taxaParticipacaoLoading.set(true);
  }

  buscaHorasVisitas(): void {
    this.horasVisitas$ = this.dashboardService
      .getHorasVisitas(this.filters)
      .pipe(finalize(() => this.horasVisitasLoading.set(false)));

    this.horasVisitasLoading.set(true);
  }

  buscaVisitarPorEntidade(): void {
    this.visitasPorEntidade$ = this.dashboardService
      .getVisitasPorEntidade(this.filters)
      .pipe(finalize(() => this.visitasPorEntidadeLoading.set(false)));

    this.visitasPorEntidadeLoading.set(true);
  }

  buscaVisitarPorVoluntario(): void {
    this.visitasPorVoluntario$ = this.dashboardService
      .getVisitasPorVoluntario(this.filters)
      .pipe(finalize(() => this.visitasPorVoluntarioLoading.set(false)));

    this.visitasPorVoluntarioLoading.set(true);
  }
}
