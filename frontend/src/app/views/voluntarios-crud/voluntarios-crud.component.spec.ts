import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HeaderService } from '../../components/template/header/header.service';
import { TestingModule } from '../../shared/tests';
import { VoluntariosCrudComponent } from './voluntarios-crud.component';

describe(VoluntariosCrudComponent.name, () => {
  let fixture: ComponentFixture<VoluntariosCrudComponent>;
  let component: VoluntariosCrudComponent;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntariosCrudComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntariosCrudComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o cabeçalho com o link e com o nome de 'Voluntários'`, () => {
    const headerService = TestBed.inject(HeaderService);
    expect(headerService.headerData.title).toBe('Voluntários');
    expect(headerService.headerData.routeUrl).toBe('/voluntarios');
  });

  it(`DEVE renderizar a listagem de voluntários
    QUANDO carregar renderizar o componente principal`, () => {
    fixture.detectChanges();
    const listagem = fixture.debugElement.query(By.css('app-voluntarios-read'));

    expect(listagem).toBeTruthy();
  });

  it(`(D) DEVE navegar para criação de novo voluntário
    QUANDO clicado no botão de criação de voluntário`, waitForAsync(async () => {
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-criar-voluntario'))
      .nativeElement as HTMLButtonElement;
    btn.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/voluntarios/create');
  }));

  it(`${VoluntariosCrudComponent.prototype.navigateToVoluntariosCreate.name} DEVE navegar para criação de novo voluntário
    QUANDO chamado`, waitForAsync(async () => {
    fixture.detectChanges();
    component.navigateToVoluntariosCreate();
    await fixture.whenStable();

    expect(location.path()).toBe('/voluntarios/create');
  }));
});
