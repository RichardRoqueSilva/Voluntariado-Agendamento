import { Injectable } from '@angular/core';
import { HorarioService } from '../../../shared/services/horario';
import { EntidadesFormModel } from '../models/entidades-form.model';
import { Entidades } from '../models/entidades.model';

@Injectable({
  providedIn: 'root',
})
export class EntidadesMapperService {
  constructor(private _horarioService: HorarioService) {}

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
      horarioInicioVisita: this._horarioService.toHorario(
        form.horarioInicioVisita
      ),
      horarioFimVisita: this._horarioService.toHorario(form.horarioFimVisita),
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
      horarioInicioVisita: this._horarioService.toDate(
        model.horarioInicioVisita
      ), // O Timepicker do material trabalho com data, por isso é convertido em data hora
      horarioFimVisita: this._horarioService.toDate(model.horarioFimVisita),
    };
  }
}
