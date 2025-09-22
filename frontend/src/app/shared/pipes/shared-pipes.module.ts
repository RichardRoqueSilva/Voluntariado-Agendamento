import { NgModule } from '@angular/core';
import { HorarioParaDataPipe } from './horario-para-data';

@NgModule({
  imports: [HorarioParaDataPipe],
  exports: [HorarioParaDataPipe],
})
export class SharedPipesModule {}
