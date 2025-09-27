import { TestBed } from '@angular/core/testing';
import { HorarioService } from './horario.service';

describe(HorarioService.name, () => {
  let service: HorarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HorarioService],
    }).compileComponents();

    service = TestBed.inject(HorarioService);
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com argumento vazio.`, () => {
    expect(service.toDate('')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com argumento nulo.`, () => {
    expect(service.toDate(null)).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar a data do dia de hoje, às 9 horas, 37 minutos e 50 segundos QUANDO chamado com argumento '09:37:50'.`, () => {
    const data = service.toDate('09:37:50');
    const dataAtual = new Date();
    expect(data?.getDate()).toBe(dataAtual.getDate());
    expect(data?.getMonth()).toBe(dataAtual.getMonth());
    expect(data?.getFullYear()).toBe(dataAtual.getFullYear());
    expect(data?.getHours()).toBe(9);
    expect(data?.getMinutes()).toBe(37);
    expect(data?.getSeconds()).toBe(50);
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com horas negativas ('-09:37:50').`, () => {
    expect(service.toDate('-09:37:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com horas acima de 23 ('24:37:50').`, () => {
    expect(service.toDate('24:37:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com minutos negativos ('09:-37:50').`, () => {
    expect(service.toDate('09:-37:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com minutos acima de 59 ('09:60:50').`, () => {
    expect(service.toDate('09:60:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com segundos negativos ('09:37:-50').`, () => {
    expect(service.toDate('09:37:-50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com segundos acima de 59 ('09:37:60').`, () => {
    expect(service.toDate('09:37:60')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com letra nas horas ('a:37:50').`, () => {
    expect(service.toDate('a:37:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com letra nos minutos ('09:a:50').`, () => {
    expect(service.toDate('09:a:50')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com letra nos segundos ('09:37:a').`, () => {
    expect(service.toDate('09:37:a')).toBeNull();
  });

  it(`#${HorarioService.prototype.toDate.name} DEVE retornar nulo QUANDO chamado com horário incompleto ('09:37').`, () => {
    expect(service.toDate('09:37')).toBeNull();
  });

  it(`#${HorarioService.prototype.toHorario.name} DEVE retornar nulo QUANDO chamado data nula.`, () => {
    expect(service.toHorario(null)).toBeNull();
  });

  it(`#${HorarioService.prototype.toHorario.name} DEVE retornar '09:52:33' QUANDO chamado com data 24/09/2025 09:52:33.`, () => {
    const data = new Date(2025, 9 - 1, 24, 9, 52, 33);
    expect(service.toHorario(data)).toBe('09:52:33');
  });
});
