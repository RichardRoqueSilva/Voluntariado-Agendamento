import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  /**
   * Converte string de data no formato YYYY-MM-DD para objeto Date
   * @param dateStr - Data no formato YYYY-MM-DD
   * @returns Objeto date representando a data, ou nulo, caso a string esteja nula ou vazia
   */
  public toDate(dataStr: string | null): Date | null {
    if (!dataStr || dataStr.trim().length == 0) {
      return null;
    }

    const partesData = dataStr.split('-');

    if (partesData.length < 3) {
      return null;
    }

    const ano = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const dia = parseInt(partesData[2]);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
      return null;
    }

    if (ano <= 0 || mes > 12 || mes <= 0 || dia <= 0 || dia > 31) {
      return null;
    }

    return new Date(ano, mes - 1, dia);
  }

  /**
   * Converte um objeto de data em uma string no formato YYYY-MM-DD
   * @param data - Objeto de data
   * @returns String da data no formato YYYY-MM-DD, ou nulo, caso a data esteja nula
   */
  public toString(data: Date | null): string | null {
    if (data == null) {
      return null;
    }

    const dataISO = data.toISOString();
    return dataISO.substring(0, 10);
  }
}
