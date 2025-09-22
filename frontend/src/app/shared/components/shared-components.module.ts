import { NgModule } from '@angular/core';
import { FontResizeBtnComponent } from './font-resize-btn/font-resize-btn.component';
import { VlibrasComponent } from './vlibras';

@NgModule({
  imports: [FontResizeBtnComponent, VlibrasComponent],
  exports: [FontResizeBtnComponent, VlibrasComponent],
})
export class SharedComponentsModule {}
