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
  public toHorario(data: Date | null | undefined): string | null {
    if (data == null) {
      return null;
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

    if (parts.length < 3) {
      return null;
    }

    const horas = parseInt(parts[0]);
    const minutos = parseInt(parts[1]);
    const segundos = parseInt(parts[2]);

    if (isNaN(horas) || isNaN(minutos) || isNaN(segundos)) {
      return null;
    }

    if (
      horas < 0 ||
      horas > 23 ||
      minutos < 0 ||
      minutos >= 60 ||
      segundos < 0 ||
      segundos >= 60
    ) {
      return null;
    }

    const hoje = new Date();
    hoje.setHours(horas, minutos, segundos);
    return hoje;
  }
}
