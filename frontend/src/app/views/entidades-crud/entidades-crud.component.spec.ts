import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HeaderService } from '../../components/template/header/header.service';
import { TestingModule } from '../../shared/tests';
import { EntidadesCrudComponent } from './entidades-crud.component';

describe(EntidadesCrudComponent.name, () => {
  let fixture: ComponentFixture<EntidadesCrudComponent>;
  let component: EntidadesCrudComponent;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesCrudComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadesCrudComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o cabeçalho com o link e com o nome de 'Entidades'`, () => {
    const headerService = TestBed.inject(HeaderService);
    expect(headerService.headerData.title).toBe('Entidades');
    expect(headerService.headerData.routeUrl).toBe('/entidades');
  });

  it(`DEVE renderizar a listagem de entidades
     QUANDO carregar renderizar o componente principal`, () => {
    fixture.detectChanges();
    const listagem = fixture.debugElement.query(By.css('app-entidades-read'));

    expect(listagem).toBeTruthy();
  });

  it(`(D) DEVE navegar para criação de nova entidade
     QUANDO clicado no botão de criação de entidade`, waitForAsync(async () => {
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-criar-entidade'))
      .nativeElement as HTMLButtonElement;
    btn.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/entidades/create');
  }));

  it(`${EntidadesCrudComponent.prototype.navigateToEntidadesCreate.name} DEVE navegar para criação de nova entidade
     QUANDO chamado`, waitForAsync(async () => {
    fixture.detectChanges();
    component.navigateToEntidadesCreate();
    await fixture.whenStable();

    expect(location.path()).toBe('/entidades/create');
  }));
});
