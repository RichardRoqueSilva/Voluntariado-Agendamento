import { NgModule } from '@angular/core';
import { HorarioParaDataPipe } from './horario-para-data';
import { MsParaHhmmssPipe } from './ms-para-hhmmss';

@NgModule({
  imports: [HorarioParaDataPipe, MsParaHhmmssPipe],
  exports: [HorarioParaDataPipe, MsParaHhmmssPipe],
})
export class SharedPipesModule {}
