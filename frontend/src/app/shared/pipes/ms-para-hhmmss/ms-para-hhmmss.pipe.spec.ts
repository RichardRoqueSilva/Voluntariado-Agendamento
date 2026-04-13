import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../../tests';
import { MsParaHhmmssPipe } from './ms-para-hhmmss.pipe';

describe(MsParaHhmmssPipe.name, () => {
  let pipe: MsParaHhmmssPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [MsParaHhmmssPipe],
    }).compileComponents();

    pipe = TestBed.inject(MsParaHhmmssPipe);
  });

  it('DEVE ser criado.', () => {
    const pipe = new MsParaHhmmssPipe();
    expect(pipe).toBeTruthy();
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar nulo QUANDO chamado com argumento nulo.`, () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:00:01 QUANDO chamado com argumento 1.000.`, () => {
    expect(pipe.transform(1000)).toBe('00:00:01')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:00:59 QUANDO chamado com argumento 59.000.`, () => {
    expect(pipe.transform(59000)).toBe('00:00:59')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:01:00 QUANDO chamado com argumento 60.000.`, () => {
    expect(pipe.transform(60000)).toBe('00:01:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:00:00 QUANDO chamado com argumento 0.`, () => {
    expect(pipe.transform(0)).toBe('00:00:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:00:00 QUANDO chamado com argumento menor que 1.000.`, () => {
    expect(pipe.transform(999)).toBe('00:00:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:59:00 QUANDO chamado com argumento menor que 3.540.000.`, () => {
    expect(pipe.transform(3540000)).toBe('00:59:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 00:59:00 QUANDO chamado com argumento menor que 3.599.000.`, () => {
    expect(pipe.transform(3599000)).toBe('00:59:59')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 01:00:00 QUANDO chamado com argumento menor que 3.600.000.`, () => {
    expect(pipe.transform(3600000)).toBe('01:00:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 24:00:00 QUANDO chamado com argumento menor que 86.400.000.`, () => {
    expect(pipe.transform(86400000)).toBe('24:00:00')
  });

  it(`#${MsParaHhmmssPipe.prototype.transform.name} DEVE retornar o horário 30:00:00 QUANDO chamado com argumento menor que 108.000.000.`, () => {
    expect(pipe.transform(108000000)).toBe('30:00:00')
  });
});
