import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe(DataService.name, () => {
  let service: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DataService],
    }).compileComponents();

    service = TestBed.inject(DataService);
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com argumento vazio.`, () => {
    expect(service.toDate('')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com argumento nulo.`, () => {
    expect(service.toDate(null)).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com ano 0 ('0-09-24').`, () => {
    expect(service.toDate('0-09-24')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com ano -1 ('-1-09-24').`, () => {
    expect(service.toDate('-1-09-24')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com mês 13 ('2025-13-24').`, () => {
    expect(service.toDate('2025-13-24')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com mês 0 ('2025-0-24').`, () => {
    expect(service.toDate('2025-0-24')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com dia 0 ('2025-09-0').`, () => {
    expect(service.toDate('2025-09-0')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data com dia 32 ('2025-09-32').`, () => {
    expect(service.toDate('2025-09-32')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data contendo letras ('2025-a-32').`, () => {
    expect(service.toDate('2025-a-32')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar nulo QUANDO chamada com data incompleta ('2025-09').`, () => {
    expect(service.toDate('2025-09')).toBeNull();
  });

  it(`#${DataService.prototype.toDate.name} DEVE retornar uma data válida QUANDO chamada com argumento '2025-09-24'.`, () => {
    const data = service.toDate('2025-09-24');
    expect(data?.getDate()).toBe(24);
    expect(data?.getMonth()).toBe(9 - 1);
    expect(data?.getFullYear()).toBe(2025);
  });

  it(`#${DataService.prototype.toString.name} DEVE retornar nulo QUANDO chamada com argumento nulo.`, () => {
    expect(service.toString(null)).toBeNull();
  });

  it(`#${DataService.prototype.toString.name} DEVE retornar '2025-09-24' QUANDO chamada com objeto de data do dia 24/09/2025.`, () => {
    expect(service.toString(new Date(2025, 9 - 1, 24))).toBe('2025-09-24');
  });
});
