import { Injectable } from "@angular/core";
import { EntidadesFormModel } from "../models/entidades-form.model";
import { Entidades } from "../models/entidades.model";

@Injectable({
  providedIn: "root",
})
export class EntidadesMapperService {
  constructor() {}

  /**
   * Converte a entidade do formulário no formatdo da API
   * @param form Modelo dos formulários
   * @returns Modelo no formato da API
   */
  toAPI(form: EntidadesFormModel): Entidades {
    return {
      id: form.id,
      nome: form.nome,
      endereco: form.endereco,
      responsavel: form.responsavel,
      telefone: form.telefone,
      diasVisita: form.diasVisita,
      horarioInicioVisita: this._toHorario(form.horarioInicioVisita),
      horarioFimVisita: this._toHorario(form.horarioFimVisita),
    };
  }

  /**
   * Converte a entidade vinda da API para o formato do formulário
   * @param model Modelo vindo da API
   * @returns Modelo no formato que os formulário esperam
   */
  toForm(model: Entidades): EntidadesFormModel {
    return {
      id: model.id,
      nome: model.nome,
      endereco: model.endereco,
      responsavel: model.responsavel,
      telefone: model.telefone,
      diasVisita: model.diasVisita,
      horarioInicioVisita: this._toDate(model.horarioInicioVisita), // O Timepicker do material trabalho com data, por isso é convertido em data hora
      horarioFimVisita: this._toDate(model.horarioFimVisita),
    };
  }

  /**
   * Converte o objeto de data retornado do timepicker para uma string no formato HH:mm:ss
   * @param data Objeto de data do timepicker
   * @returns String no formato HH:mm:ss ou nulo, caso a data esteja nula
   */
  private _toHorario(data: Date | null): string {
    if (data == null) {
      return "";
    }

    return data.toLocaleTimeString();
  }

  /**
   * Converte string no formato HH:mm:ss em objeto de data
   * @param horario Horário no formato HH:mm:ss
   * @returns Objeto de data ou nulo, caso o horário esteja nulo ou vazio
   */
  private _toDate(horario: string | null): Date | null {
    if (!horario || horario.length == 0) {
      return null;
    }

    const parts = horario.split(':')

    const hoje = new Date()
    hoje.setHours(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]))
    return hoje
  }
}
