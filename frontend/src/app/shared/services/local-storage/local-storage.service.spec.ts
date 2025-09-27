import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../../tests';
import { LocalStorageKey } from './local-storage-key';
import { LocalStorageService } from './local-storage.service';

describe(LocalStorageService.name, () => {
  let service: LocalStorageService;
  let localStorage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [LocalStorageService],
    }).compileComponents();

    service = TestBed.inject(LocalStorageService);
    localStorage = TestBed.inject(Storage);
  });

  it(`#${LocalStorageService.prototype.salvarNoLocalStorage.name} DEVE lançar erro QUANDO chamado com chave nula.`, () => {
    const chave: any = null;
    expect(() => {
      service.salvarNoLocalStorage(chave, null);
    }).toThrowError('Não é permitido salvar conteúdo com chave nula!');
  });

  it(`#${LocalStorageService.prototype.salvarNoLocalStorage.name} DEVE salvar valor numérico QUANDO chamado com chave válida e valor numérico.`, () => {
    service.salvarNoLocalStorage(LocalStorageKey.TAMANHO_FONTE, 13);
    expect(localStorage.getItem(LocalStorageKey.TAMANHO_FONTE)).toBe('13');
  });

  it(`#${LocalStorageService.prototype.salvarNoLocalStorage.name} DEVE salvar valor textual QUANDO chamado com chave válida e valor textual.`, () => {
    service.salvarNoLocalStorage(LocalStorageKey.TAMANHO_FONTE, '1rem');
    expect(localStorage.getItem(LocalStorageKey.TAMANHO_FONTE)).toBe('1rem');
  });

  it(`#${LocalStorageService.prototype.salvarNoLocalStorage.name} DEVE salvar objeto QUANDO chamado com chave válida e valor como objeto.`, () => {
    service.salvarNoLocalStorage(LocalStorageKey.TAMANHO_FONTE, {
      teste: 1,
    });
    expect(localStorage.getItem(LocalStorageKey.TAMANHO_FONTE)).toBe(
      '{"teste":1}'
    );
  });

  it(`#${LocalStorageService.prototype.lerDoLocalStorage.name} DEVE retornar nulo QUANDO chamado com chave que não possui valor associado.`, () => {
    expect(service.lerDoLocalStorage(LocalStorageKey.TAMANHO_FONTE)).toBeNull();
  });

  it(`#${LocalStorageService.prototype.lerDoLocalStorage.name} DEVE retornar valor textual QUANDO chamado com chave válida que possui valor textual associado.`, () => {
    service.salvarNoLocalStorage(LocalStorageKey.TAMANHO_FONTE, '1rem');
    expect(service.lerDoLocalStorage(LocalStorageKey.TAMANHO_FONTE)).toBe(
      '1rem'
    );
  });
});
