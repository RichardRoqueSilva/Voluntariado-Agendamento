import { Injectable } from '@angular/core';
import { LocalStorageKey } from './local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private _localStorage: Storage) {}

  public lerDoLocalStorage(chave: LocalStorageKey): string | null {
    const valor = this._localStorage.getItem(chave);
    if (valor == null || valor.trim().length == 0) {
      return null;
    }

    return valor;
  }

  public salvarNoLocalStorage(chave: LocalStorageKey, valor: any): void {
    if (chave == null) {
      throw new Error('Não é permitido salvar conteúdo com chave nula!');
    }

    const valorStr = typeof valor == 'string' ? valor : JSON.stringify(valor);

    this._localStorage.setItem(chave, valorStr);
  }
}
