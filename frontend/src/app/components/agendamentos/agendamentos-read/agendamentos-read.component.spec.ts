import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { routes } from '../../../app.routes';
import { ConfirmDialogService } from '../../../shared/components/confirm-dialog';
import { TestingModule } from '../../../shared/tests';
import { AGENDAMENTO_FORM_MOCK } from '../../../views/agendamentos-crud/mock/agendamento-form-mock';
import { AgendamentosService } from '../agendamentos.service';
import {
  AGENDAMENTOS_AGENDAMENTO_MOCK,
  AGENDAMENTOS_FORM_AGENDAMENTO_MOCK,
} from '../mock/agendamentos-read-mock';
import { Agendamentos } from '../models/agendamentos.model';
import { AGENDAMENTOS_READ_MOCK } from './../mock/agendamentos-read-mock';
import { AgendamentosReadComponent } from './agendamentos-read.component';

describe(AgendamentosReadComponent.name, () => {
  let fixture: ComponentFixture<AgendamentosReadComponent>;
  let component: AgendamentosReadComponent;
  let agendamentosService: AgendamentosService;
  let confirmDialogService: ConfirmDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentosReadComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentosReadComponent);
    component = fixture.componentInstance;
    agendamentosService = TestBed.inject(AgendamentosService);
    confirmDialogService = TestBed.inject(ConfirmDialogService);
  });

  it(`${AgendamentosReadComponent.name} DEVE ser criado`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar a listagem dos agendamentos
    QUANDO componente inicializar.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    expect(component.agendamentos).toBe(AGENDAMENTOS_READ_MOCK);
  });

  it(`(D) DEVE renderizar a coluna 'Nome'
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('nome');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Nome' está incorreto`)
      .toContain('Nome');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Nome' está incorreto`)
      .toContain('Entidade teste');
  });

  it(`(D) DEVE renderizar a coluna 'Dias de Visita'
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('visita');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Dias de Visita' está incorreto`)
      .toContain('Dias de Visita');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Dias de Visita' está incorreto`)
      .toContain('26/09/2025');
  });

  it(`(D) DEVE renderizar a coluna 'Horário'
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('horario');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Horário' está incorreto`)
      .toContain('Horário');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Horário' está incorreto`)
      .toContain('13:30:00');
  });

  it(`(D) DEVE renderizar a coluna 'Status'
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('status');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Status' está incorreto`)
      .toContain('Status');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Status' está incorreto`)
      .toContain('Confirmado');
  });

  it(`(D) DEVE renderizar a coluna 'Voluntários'
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('voluntarios');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Voluntários' está incorreto`)
      .toContain('Voluntários');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Voluntários' está incorreto`)
      .toContain('Nome teste 1');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Voluntários' está incorreto`)
      .toContain('Nome teste 2');
  });

  it(`(D) DEVE renderizar o botão de edição de agendamento
    QUANDO componente receber a listagem dos agendamentos.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Ações' está incorreto`)
      .toContain('Ações');

    expect(botoes[0])
      .withContext(`Botão de edição da coluna 'Ações' não está presente`)
      .toBeTruthy();

    expect(botoes[1])
      .withContext(`Botão de exclusão da coluna 'Ações' não está presente`)
      .toBeTruthy();
  });

  it(`(D) DEVE exibir modal de edição do agendamento
    QUANDO clicar no botão de edição de agendamento.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[0].nativeElement).click();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-modal-agendamento'));

    expect(component.mostrarModal).toBeTrue();
    expect(component.agendamento).toBe(AGENDAMENTOS_READ_MOCK[0]);
    expect(modal).toBeTruthy();
  });

  it(`(D) #${AgendamentosReadComponent.prototype.fecharModal.name} DEVE fechar modal de edição do agendamento
    QUANDO chamado.`, () => {
    const subject = new Subject<Agendamentos[]>();
    spyOn(agendamentosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(AGENDAMENTOS_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[0].nativeElement).click();
    fixture.detectChanges();
    component.fecharModal();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-modal-agendamento'));

    expect(component.mostrarModal).toBeFalse();
    expect(modal).toBeFalsy();
  });

  it(`#${AgendamentosReadComponent.prototype.salvarAgendamento.name} DEVE salvar o novo agendamento
       QUANDO chamado com os dados de agendamento, sem id de agendamento.`, (done) => {
    spyOn(agendamentosService, 'create').and.callFake((agen) => {
      expect(agen.entidadeId).toBe(
        AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.entidadeId
      );
      expect(agen.diasVisita).toBe(
        AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.diasVisita
      );
      expect(agen.horario).toBe(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.horario);
      expect(agen.status).toBe(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.status);
      expect(agen.participantesIds[0]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[0]
      );
      expect(agen.participantesIds[1]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[1]
      );
      done();

      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    component.salvarAgendamento(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK);
  });

  it(`#${AgendamentosReadComponent.prototype.salvarAgendamento.name} DEVE exibir mensagem de agendamento com sucesso
       QUANDO chamado com os dados de agendamento, sem id de agendamento.`, (done) => {
    spyOn(agendamentosService, 'create').and.callFake((_) => {
      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    spyOn(agendamentosService, 'showMessage').and.callFake((mensagem) => {
      expect(mensagem).toBe('Agendamento realizado com sucesso');
      done();
    });

    component.salvarAgendamento(AGENDAMENTO_FORM_MOCK);
  });

  it(`#${AgendamentosReadComponent.prototype.salvarAgendamento.name} DEVE exibir recarregar dados da listagem
       QUANDO chamado com os dados de agendamento.`, () => {
    spyOn(agendamentosService, 'create').and.callFake((_) => {
      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    const spy = spyOn(component, 'buscarAgendamentos');
    component.salvarAgendamento(AGENDAMENTO_FORM_MOCK);
    expect(spy).toHaveBeenCalled();
  });

  it(`#${AgendamentosReadComponent.prototype.salvarAgendamento.name} DEVE atualizar agendamento existente
       QUANDO chamado com os dados de agendamento, com id de agendamento existente.`, (done) => {
    spyOn(agendamentosService, 'update').and.callFake((id, agen) => {
      expect(component.agendamento.id).toBe(id);
      expect(agen.entidadeId).toBe(
        AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.entidadeId
      );
      expect(agen.diasVisita).toBe(
        AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.diasVisita
      );
      expect(agen.horario).toBe(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.horario);
      expect(agen.status).toBe(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK.status);
      expect(agen.participantesIds[0]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[0]
      );
      expect(agen.participantesIds[1]).toBe(
        AGENDAMENTO_FORM_MOCK.participantesIds[1]
      );
      done();

      return new Observable((sub) => {
        sub.next();
        sub.complete();
      });
    });

    component.agendamento = AGENDAMENTOS_READ_MOCK[0];
    component.salvarAgendamento(AGENDAMENTOS_FORM_AGENDAMENTO_MOCK);
  });

  it(`#${AgendamentosReadComponent.prototype.deleteAgendamentos.name} DEVE chamar dialog de confirmação de exclusão de agendamento
       QUANDO chamado.`, (done) => {
    spyOn(confirmDialogService, 'confirm').and.callFake((mensagem, config) => {
      expect(mensagem).toBe('Tem certeza que deseja excluir este agendamento?');
      expect(config?.callbackOnConfirm).toBeDefined();
      done();
    });

    component.deleteAgendamentos(1);
  });

  it(`#${AgendamentosReadComponent.prototype.deleteAgendamentos.name} DEVE excluir agendamento
    QUANDO confirmado na dialog.`, (done) => {
    fixture.detectChanges();

    spyOn(agendamentosService, 'delete').and.callFake((id) => {
      expect(id).toBe(1);
      done();

      return new BehaviorSubject<Agendamentos>(
        AGENDAMENTOS_AGENDAMENTO_MOCK
      ).asObservable();
    });

    spyOn(confirmDialogService, 'confirm').and.callFake((_, config) => {
      (<any>config).callbackOnConfirm();
    });

    component.deleteAgendamentos(1);
  });

  it(`#${AgendamentosReadComponent.prototype.deleteAgendamentos.name} DEVE exibir mensagem de erro
    QUANDO chamada para excluir agendamento receber erro.`, (done) => {
    fixture.detectChanges();

    const subject = new Subject<Agendamentos>();
    spyOn(agendamentosService, 'delete').and.returnValue(
      subject.asObservable()
    );

    spyOn(confirmDialogService, 'confirm').and.callFake((_, config) => {
      (<any>config).callbackOnConfirm();
    });

    spyOn(agendamentosService, 'showMessage').and.callFake(
      (mensagem, isErro) => {
        expect(mensagem).toBe('Erro ao excluir o agendamento!');
        expect(isErro).toBeTrue();
        done();
      }
    );

    component.deleteAgendamentos(1);
    subject.error(new Error());
    expect;
  });
});
