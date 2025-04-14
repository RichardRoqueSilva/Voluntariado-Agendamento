import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hospitais } from './hospitais.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class HospitaisService {

  baseUrl = "http://localhost:3001/hospitais"

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
  

  create(hospitais: Hospitais): Observable<Hospitais>{
    return this.http.post<Hospitais>(this.baseUrl, hospitais).pipe(map(obj => obj),
    catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  read(): Observable<Hospitais[]>{
    return this.http.get<Hospitais[]>(this.baseUrl);
  }

  readById(id: string): Observable<Hospitais> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Hospitais>(url);
  }

  update(hospitais: Hospitais): Observable<Hospitais> {
    const url = `${this.baseUrl}/${hospitais.id}`;
    return this.http.put<Hospitais>(url, hospitais);
  }

  delete(id: number): Observable<Hospitais>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Hospitais>(url);
  }

}
