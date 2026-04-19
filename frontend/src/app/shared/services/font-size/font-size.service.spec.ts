import { TestBed } from '@angular/core/testing';

import { skip } from 'rxjs';
import { FontSizeService } from './font-size.service';

describe(FontSizeService.name, () => {
  let service: FontSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontSizeService);
  });

  it(`DEVE ser criado.`, () => {
    expect(service).toBeTruthy();
  });

  it(`DEVE sempre inicializar como 1rem
    QUANDO criado.`, (done) => {
    service.fontSizeRem$.pipe().subscribe((novoValor) => {
      expect(novoValor).toBe(1);
      done();
    });
  });

  it(`#${FontSizeService.prototype.notifyFontSizeChange.name} DEVE notificar mudança de valor para 2rem
    QUANDO chamado com 2.`, (done) => {
    service.fontSizeRem$.pipe(skip(1)).subscribe((novoValor) => {
      expect(novoValor).toBe(2);
      done();
    });

    service.notifyFontSizeChange(2);
  });
});
