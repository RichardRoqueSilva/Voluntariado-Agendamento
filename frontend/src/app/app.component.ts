import { Component, LOCALE_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // Imports @angular/core primeiro
import { RouterOutlet, Router, NavigationEnd, Event as RouterEvent } from '@angular/router'; // Imports @angular/router
import { CommonModule, registerLocaleData } from '@angular/common'; // Imports @angular/common
import localePt from '@angular/common/locales/pt';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Imports de Componentes de Layout
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from "./components/template/nav/nav.component";

// Imports do Angular Material (necessários para o template)
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
// Outros módulos do Material usados no template podem ser necessários se não forem standalone

registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  // Removido styleUrls e encapsulation
  imports: [
    CommonModule,         // Para *ngIf, [class], etc.
    RouterOutlet,         // Essencial para roteamento
    // Componentes de Layout
    HeaderComponent,
    FooterComponent,
    NavComponent,
    // Módulos do Material usados diretamente no template
    MatSidenavModule,
    MatListModule,
   // Adicione outros imports necessários *usados neste template*
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoginPage: boolean = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // Lógica para detectar a página de login (parece correta)
    this.routerSubscription = this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects === '/login';
      console.log("URL:", event.urlAfterRedirects, " | isLoginPage:", this.isLoginPage);
      // Tente remover ou comentar this.cdRef.detectChanges(); temporariamente
      // Pode não ser necessário e às vezes causa ciclos inesperados
      // this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}