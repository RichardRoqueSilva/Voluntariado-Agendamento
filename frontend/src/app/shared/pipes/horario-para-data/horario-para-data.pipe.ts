import { Pipe, PipeTransform } from '@angular/core';
import { HorarioService } from '../../services/horario';

@Pipe({
  name: 'horarioParaData',
  standalone: true,
})
export class HorarioParaDataPipe implements PipeTransform {
  constructor(private _horarioService: HorarioService) {}
  transform(value?: string | null, ...args: any[]): Date | null {
    return this._horarioService.toDate(value);
  }
}
