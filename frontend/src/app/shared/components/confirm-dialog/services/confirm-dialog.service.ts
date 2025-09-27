import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { ConfirmDialogData } from '../model/confirm-dialog-data';
import { ConfirmDialogOptions } from '../model/confirm-dialog-options';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  constructor() {}

  public confirm(mensagem: string, opcoes?: ConfirmDialogOptions) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        mensagem,
        opcoes,
      },
    } as MatDialogConfig<ConfirmDialogData>);
  }
}
