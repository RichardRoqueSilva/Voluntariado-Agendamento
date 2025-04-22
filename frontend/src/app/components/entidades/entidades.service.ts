import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entidades } from './entidades.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  baseUrl = "http://localhost:3001/entidades"

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
  

  create(entidades: Entidades): Observable<Entidades>{
    return this.http.post<Entidades>(this.baseUrl, entidades).pipe(map(obj => obj),
    catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  read(): Observable<Entidades[]>{
    return this.http.get<Entidades[]>(this.baseUrl);
  }

  readById(id: string): Observable<Entidades> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Entidades>(url);
  }

  update(entidades: Entidades): Observable<Entidades> {
    const url = `${this.baseUrl}/${entidades.id}`;
    return this.http.put<Entidades>(url, entidades);
  }

  delete(id: number): Observable<Entidades>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Entidades>(url);
  }

}
