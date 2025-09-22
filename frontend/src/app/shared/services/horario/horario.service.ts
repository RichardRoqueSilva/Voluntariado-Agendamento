import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  constructor() {}

  /**
   * Converte o objeto de data retornado do timepicker para uma string no formato HH:mm:ss
   * @param data Objeto de data do timepicker
   * @returns String no formato HH:mm:ss ou nulo, caso a data esteja nula
   */
  public toHorario(data: Date | null | undefined): string {
    if (data == null) {
      return '';
    }

    return data.toLocaleTimeString();
  }

  /**
   * Converte string no formato HH:mm:ss em objeto de data
   * @param horario Horário no formato HH:mm:ss
   * @returns Objeto de data ou nulo, caso o horário esteja nulo ou vazio
   */
  public toDate(horario: string | null | undefined): Date | null {
    if (!horario || horario.length == 0) {
      return null;
    }

    const parts = horario.split(':');

    const hoje = new Date();
    hoje.setHours(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
    return hoje;
  }
}
