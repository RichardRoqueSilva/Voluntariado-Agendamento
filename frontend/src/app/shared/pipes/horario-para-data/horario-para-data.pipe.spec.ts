import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../../tests';
import { HorarioParaDataPipe } from './horario-para-data.pipe';

describe(HorarioParaDataPipe.name, () => {
  let pipe: HorarioParaDataPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [HorarioParaDataPipe],
    }).compileComponents();

    pipe = TestBed.inject(HorarioParaDataPipe);
  });

  it(`#${HorarioParaDataPipe.prototype.transform.name} DEVE retornar nulo QUANDO chamado com argumento nulo.`, () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it(`#${HorarioParaDataPipe.prototype.transform.name} DEVE retornar nulo QUANDO chamado com argumento vazio.`, () => {
    expect(pipe.transform('')).toBeNull();
  });

  it(`#${HorarioParaDataPipe.prototype.transform.name} DEVE retornar a data de hoje no horário 09:40:55 QUANDO chamado com argumento '09:40:55'.`, () => {
    const horarioTransformado = pipe.transform('09:40:55');

    const hoje = new Date();
    hoje.setHours(9, 40, 55);

    expect(horarioTransformado?.getDate()).toBe(hoje.getDate());
    expect(horarioTransformado?.getMonth()).toBe(hoje.getMonth());
    expect(horarioTransformado?.getFullYear()).toBe(hoje.getFullYear());
    expect(horarioTransformado?.getHours()).toBe(hoje.getHours());
    expect(horarioTransformado?.getMinutes()).toBe(hoje.getMinutes());
    expect(horarioTransformado?.getSeconds()).toBe(hoje.getSeconds());
  });
});
