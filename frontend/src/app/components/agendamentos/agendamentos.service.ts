import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamentos } from './agendamentos.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  baseUrl = "http://localhost:3001/agendamentos"

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
  

  create(agendamentos: Agendamentos): Observable<Agendamentos>{
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

  update(agendamentos: Agendamentos): Observable<Agendamentos> {
    const url = `${this.baseUrl}/${agendamentos.id}`;
    return this.http.put<Agendamentos>(url, agendamentos);
  }

  delete(id: number): Observable<Agendamentos>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Agendamentos>(url);
  }

}
