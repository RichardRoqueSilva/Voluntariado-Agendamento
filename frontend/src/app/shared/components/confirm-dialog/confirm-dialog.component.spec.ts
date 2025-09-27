import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogData } from './model/confirm-dialog-data';
import { ConfirmDialogOptions } from './model/confirm-dialog-options';

describe(ConfirmDialogComponent.name, () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let data: ConfirmDialogData;
  let dialogRef: MatDialogRef<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            mensagem: 'Mensagem teste',
            opcoes: {
              callbackOnCancel: () => {},
              callbackOnConfirm: () => {},
            },
          } as ConfirmDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    data = TestBed.inject(MAT_DIALOG_DATA);
    dialogRef = TestBed.inject(MatDialogRef<ConfirmDialogComponent>);
  });

  it(`DEVE criar componente.`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE renderizar mensagem passada.`, () => {
    fixture.detectChanges();

    const paragrafo = fixture.debugElement.query(By.css('p'))
      .nativeElement as HTMLParagraphElement;
    expect(paragrafo.textContent).toContain('Mensagem teste');
  });

  it(`${ConfirmDialogComponent.prototype.cancel} DEVE chamar função de callback de cancelamento e fechar dialog
    QUANDO chamado`, () => {
    fixture.detectChanges();

    const spyCallbackCancel = spyOn<ConfirmDialogOptions, any>(
      data.opcoes as ConfirmDialogOptions,
      'callbackOnCancel'
    );

    const spyDialogClose = spyOn(dialogRef, 'close');

    component.cancel();

    expect(spyCallbackCancel).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalled();
  });

  it(`${ConfirmDialogComponent.prototype.confirm} DEVE chamar função de callback de confirmação e fechar dialog
    QUANDO chamado`, () => {
    fixture.detectChanges();

    const spyCallbackConfirm = spyOn<ConfirmDialogOptions, any>(
      data.opcoes as ConfirmDialogOptions,
      'callbackOnConfirm'
    );

    const spyDialogClose = spyOn(dialogRef, 'close');

    component.confirm();

    expect(spyCallbackConfirm).toHaveBeenCalled();
    expect(spyDialogClose).toHaveBeenCalled();
  });
});
