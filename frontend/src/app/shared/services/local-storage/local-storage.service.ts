import { Injectable } from '@angular/core';
import { LocalStorageKey } from './local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public lerDoLocalStorage<T>(chave: LocalStorageKey): T | null {
    const valor = localStorage.getItem(chave);

    if (valor == null || valor.trim().length == 0) {
      return null;
    }

    return JSON.parse(valor);
  }

  public salvarNoLocalStorage(chave: LocalStorageKey, value: any): void {
    if (chave == null) {
      throw new Error('Não é permitido salvar conteúdo com chave nula!');
    }

    localStorage.setItem(chave, value);
  }
}
