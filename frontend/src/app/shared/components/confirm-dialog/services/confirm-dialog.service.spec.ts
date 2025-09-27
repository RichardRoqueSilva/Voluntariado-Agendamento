import { TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { ConfirmDialogData } from '../model/confirm-dialog-data';
import { ConfirmDialogService } from './confirm-dialog.service';

describe(ConfirmDialogService.name, () => {
  let service: ConfirmDialogService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDialogService);
    dialog = TestBed.inject(MatDialog);
  });

  it('DEVE ser criado', () => {
    expect(service).toBeTruthy();
  });

  it(`#${ConfirmDialogService.prototype.confirm.name} DEVE abrir dialog com a mensagem passada
    QUANDO chamada com mensagem no primeiro argumento.`, (done) => {
    spyOn(dialog, 'open').and.callFake(
      (component, config: MatDialogConfig<ConfirmDialogData>) => {
        expect(component).toBe(ConfirmDialogComponent);
        expect(config.data).toBeTruthy();
        expect(config.data?.mensagem).toBe('Mensagem teste');
        done();

        return null as any;
      }
    );

    service.confirm('Mensagem teste');
  });
});
