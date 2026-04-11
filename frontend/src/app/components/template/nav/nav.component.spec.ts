import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { NavComponent } from './nav.component';

describe(NavComponent.name, () => {
  let fixture: ComponentFixture<NavComponent>;
  let component: NavComponent;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) DEVE navegar para tela de dashboard
    QUANDO clicar no link 'Dashboard'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkDashboard = fixture.debugElement.query(By.css('#a-dashboard'))
      .nativeElement as HTMLAnchorElement;

    linkDashboard.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/dashboard');
  }));

  it(`(D) DEVE navegar para tela de home
    QUANDO clicar no link 'Inicio'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkHome = fixture.debugElement.query(By.css('#a-home'))
      .nativeElement as HTMLAnchorElement;

    linkHome.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/home');
  }));

  it(`(D) DEVE navegar para tela de listagem de voluntários
    QUANDO clicar no link 'Voluntários'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkVoluntarios = fixture.debugElement.query(By.css('#a-voluntarios'))
      .nativeElement as HTMLAnchorElement;

    linkVoluntarios.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/voluntarios');
  }));

  it(`(D) DEVE navegar para tela de listagem de entidades
    QUANDO clicar no link 'Entidades'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkEntidades = fixture.debugElement.query(By.css('#a-entidades'))
      .nativeElement as HTMLAnchorElement;

    linkEntidades.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/entidades');
  }));

  it(`(D) DEVE navegar para tela de listagem de agendamentos
    QUANDO clicar no link 'Agendamentos'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkAgendamentos = fixture.debugElement.query(
      By.css('#a-agendamentos')
    ).nativeElement as HTMLAnchorElement;

    linkAgendamentos.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/agendamentos');
  }));

  it(`(D) DEVE navegar para tela de login
    QUANDO clicar no link 'Desconectar'`, waitForAsync(async () => {
    fixture.detectChanges();
    const linkDesconectar = fixture.debugElement.query(By.css('#a-desconectar'))
      .nativeElement as HTMLAnchorElement;

    linkDesconectar.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/login');
  }));
});
