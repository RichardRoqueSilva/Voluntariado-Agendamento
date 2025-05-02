import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <<< Importe FormsModule
import { CommonModule } from '@angular/common'; // <<< Importe CommonModule
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../components/template/header/header.component';
import { NavComponent } from '../../components/template/nav/nav.component';
import { FooterComponent } from '../../components/template/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true, // <<< Já definido pelo CLI
  imports: [MatInputModule, MatFormFieldModule, FormsModule, RouterModule, MatSnackBarModule, 
            MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, CommonModule, HeaderComponent,
            NavComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Ou .scss, etc.
})
export class LoginComponent {

  credentials = {
    login: '',
    senha: ''
  };
  isLoading = false;
  errorMessage: string | null = null;
  private apiUrl = 'http://localhost:3001/api/auth/login'; // <<< AJUSTE A URL DA SUA API JAVA

  constructor(
    private http: HttpClient, // HttpClient agora é injetável globalmente via app.config.ts
    private router: Router    // Router também é injetável globalmente
  ) { }

  onSubmit(): void {
    if (!this.credentials.login || !this.credentials.senha) {
      this.errorMessage = 'Login e Senha são obrigatórios.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;

    console.log('Tentando logar com:', this.credentials);

    this.http.post<any>(this.apiUrl, this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login bem-sucedido!', response);
        // --- Ação Pós-Login ---
        // Guardar token/info (ex: localStorage.setItem('authToken', response.token);)
        // Navegar para a próxima página
        this.router.navigate(['/home']); // <<< AJUSTE A ROTA DE DESTINO
        // ----------------------
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Erro no login:', error);
        if (error.status === 401) {
          this.errorMessage = 'Login ou Senha inválidos.';
        } else {
          this.errorMessage = 'Erro ao tentar conectar. Tente novamente mais tarde.';
        }
      }
    });
  }
}