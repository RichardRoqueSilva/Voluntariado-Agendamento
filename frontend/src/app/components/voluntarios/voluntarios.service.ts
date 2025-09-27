import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Voluntarios } from './voluntarios.model';

@Injectable({
  providedIn: 'root',
})
export class VoluntariosService {
  baseUrl = `${environment.baseApiUrl}/api/voluntarios`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    console.log('Snackbar class:', isError ? ['msg-error'] : ['msg-success']);
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(voluntarios: Voluntarios): Observable<Voluntarios> {
    return this.http
      .post<Voluntarios>(this.baseUrl, voluntarios)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Voluntarios[]> {
    return this.http.get<Voluntarios[]>(this.baseUrl);
  }

  readById(id: string): Observable<Voluntarios> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Voluntarios>(url);
  }

  update(voluntarios: Voluntarios): Observable<Voluntarios> {
    const url = `${this.baseUrl}/${voluntarios.id}`;
    return this.http.put<Voluntarios>(url, voluntarios);
  }

  delete(id: number): Observable<Voluntarios> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Voluntarios>(url);
  }
}
