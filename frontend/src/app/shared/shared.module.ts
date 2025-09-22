import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components';
import { SharedPipesModule } from './pipes';

@NgModule({
  imports: [SharedComponentsModule, SharedPipesModule],
  exports: [SharedComponentsModule, SharedPipesModule],
})
export class SharedModule {}
