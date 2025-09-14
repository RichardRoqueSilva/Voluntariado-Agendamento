import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgendamentoForm } from './models/agendamentos-form.model';
import { Agendamentos } from './models/agendamentos.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  baseUrl = `${environment.baseApiUrl}/api/agendamentos`

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    console.log('Snackbar class:', isError ? ['msg-error'] : ['msg-success']);
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
  

  create(agendamentos: AgendamentoForm): Observable<Agendamentos>{
    return this.http.post<Agendamentos>(this.baseUrl, agendamentos).pipe(map(obj => obj),
    catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  read(): Observable<Agendamentos[]>{
    return this.http.get<Agendamentos[]>(this.baseUrl);
  }

  readById(id: string): Observable<Agendamentos> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Agendamentos>(url);
  }

  update(id: number, agendamentos: AgendamentoForm): Observable<Agendamentos> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Agendamentos>(url, agendamentos);
  }

  delete(id: number): Observable<Agendamentos>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Agendamentos>(url);
  }

}
