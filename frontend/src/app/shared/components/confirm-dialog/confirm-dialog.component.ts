import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmDialogData } from './model/confirm-dialog-data';
import { ConfirmDialogOptions } from './model/confirm-dialog-options';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  readonly mensagem = model(this.data.mensagem);
  readonly opcoes = model(this.data.opcoes);

  public cancel(): void {
    const opcoes = this.opcoes() as ConfirmDialogOptions;

    if (opcoes != null && opcoes?.callbackOnCancel != null) {
      opcoes?.callbackOnCancel();
    }

    this.dialogRef.close();
  }

  public confirm(): void {
    const opcoes = this.opcoes() as ConfirmDialogOptions;

    if (opcoes != null && opcoes?.callbackOnConfirm != null) {
      opcoes?.callbackOnConfirm();
    }

    this.dialogRef.close();
  }
}
