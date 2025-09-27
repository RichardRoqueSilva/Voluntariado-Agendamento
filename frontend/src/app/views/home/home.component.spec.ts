import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HeaderService } from '../../components/template/header/header.service';
import { TestingModule } from '../../shared/tests';
import { HomeComponent } from './home.component';

describe(HomeComponent.name, () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar o cabeçalho com o link e com o nome de 'Inicio'`, () => {
    const headerService = TestBed.inject(HeaderService);
    expect(headerService.headerData.title).toBe('Inicio');
    expect(headerService.headerData.routeUrl).toBe('');
  });
});
