import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DashboardHorizontalChartBarData } from '../models';
import { DashboardFilters } from '../models/dashboard-filters';
import { DashboardVerticalChartBarData } from '../models/dashboard-vertical-chart-bar-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = `${environment.baseApiUrl}/api`;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  getQuantidadeEntidadesVisitadas(
    filtrosDashboard: DashboardFilters
  ): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/entidades/visitas/quantidades`, {
        params: this.filtroParaHttpParams(filtrosDashboard),
      })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getQuantidadeVoluntariosVisitas(
    filtrosDashboard: DashboardFilters
  ): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/voluntarios/visitas/quantidades`, {
        params: this.filtroParaHttpParams(filtrosDashboard),
      })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getQuantidadeVoluntariosNaoParticipantesVisitas(
    filtrosDashboard: DashboardFilters
  ): Observable<number> {
    return this.http
      .get<number>(
        `${this.baseUrl}/voluntarios/nao-participantes-visitas/quantidades`,
        {
          params: this.filtroParaHttpParams(filtrosDashboard),
        }
      )
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getTaxaParticipacao(filtrosDashboard: DashboardFilters): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/voluntarios/taxa-participacao`, {
        params: this.filtroParaHttpParams(filtrosDashboard),
      })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getHorasVisitas(filtrosDashboard: DashboardFilters): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/voluntarios/visitas/totais/horas`, {
        params: this.filtroParaHttpParams(filtrosDashboard),
      })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getVisitasPorEntidade(
    filtrosDashboard: DashboardFilters
  ): Observable<DashboardHorizontalChartBarData[]> {
    return this.http
      .get<DashboardHorizontalChartBarData[]>(
        `${this.baseUrl}/entidades/visitas`,
        {
          params: this.filtroParaHttpParams(filtrosDashboard),
        }
      )
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getVisitasPorVoluntario(
    filtrosDashboard: DashboardFilters
  ): Observable<DashboardHorizontalChartBarData[]> {
    return this.http
      .get<DashboardHorizontalChartBarData[]>(
        `${this.baseUrl}/voluntarios/visitas`,
        {
          params: this.filtroParaHttpParams(filtrosDashboard),
        }
      )
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getVisitasPorDiaDaSemana(
    filtrosDashboard: DashboardFilters
  ): Observable<DashboardVerticalChartBarData[]> {
    return this.http
      .get<DashboardVerticalChartBarData[]>(
        `${this.baseUrl}/dias-da-semana/visitas`,
        {
          params: this.filtroParaHttpParams(filtrosDashboard),
        }
      )
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    console.log('Snackbar class:', isError ? ['msg-error'] : ['msg-success']);
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  filtroParaHttpParams(filtrosDashboard: DashboardFilters): HttpParams {
    const params = new HttpParams()
      .append('ano', filtrosDashboard.ano)
      .append('mes', filtrosDashboard.mes);
    return params;
  }
}
