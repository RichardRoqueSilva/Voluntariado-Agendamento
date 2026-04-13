import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msParaHhmmss',
  standalone: true
})
export class MsParaHhmmssPipe implements PipeTransform {

  transform(ms: number | null, ...args: unknown[]): string | null {
    if(ms == null) {
      return null;
    }

    const segundosTotais = ms / 1000
    const segundos = Math.floor(segundosTotais % 60)
    const minutos = Math.floor((segundosTotais % (60 * 60) )/60)
    const horas = Math.floor((segundosTotais / (60 * 60) ))

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
  }

}
