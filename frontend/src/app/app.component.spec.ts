import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TestingModule } from './shared/tests';

describe(AppComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it(`DEVE renderizar o componente principal`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`(D) DEVE mostrar a barra de navegação QUANDO a tela não for de login`, (done) => {
    const router = TestBed.inject(Router);
    const subject = new Subject<NavigationEnd>();
    spyOnProperty(router, 'events').and.returnValue(subject.asObservable());
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    router.events.subscribe(() => {
      fixture.detectChanges();

      const sidenav = fixture.debugElement.query(By.css('mat-sidenav'))
        .nativeElement as HTMLElement;
      expect(component.isLoginPage).toBeFalse();
      expect(sidenav.classList).not.toContain('hide-layout');
      done();
    });

    const event = new NavigationEnd(1, '/home', '/home');
    subject.next(event);
  });

  it(`(D) DEVE esconder a barra de navegação QUANDO a tela for de login`, (done) => {
    const router = TestBed.inject(Router);
    const subject = new Subject<NavigationEnd>();
    spyOnProperty(router, 'events').and.returnValue(subject.asObservable());
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    router.events.subscribe(() => {
      fixture.detectChanges();

      const sidenav = fixture.debugElement.query(By.css('mat-sidenav'))
        .nativeElement as HTMLElement;
      expect(component.isLoginPage).toBeTrue();
      expect(sidenav.classList).toContain('hide-layout');
      done();
    });

    const event = new NavigationEnd(1, '/login', '/login');
    subject.next(event);
  });
});
