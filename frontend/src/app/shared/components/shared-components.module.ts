import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog';
import { FontResizeBtnComponent } from './font-resize-btn/font-resize-btn.component';
import { VlibrasComponent } from './vlibras';

@NgModule({
  imports: [FontResizeBtnComponent, VlibrasComponent, ConfirmDialogComponent],
  exports: [FontResizeBtnComponent, VlibrasComponent, ConfirmDialogComponent],
})
export class SharedComponentsModule {}
