import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { ENTIDADES_READ_MOCK } from '../mock/entidades-read-mock';
import { Entidades } from '../models/entidades.model';
import { EntidadesService } from '../services/entidades.service';
import { EntidadesReadComponent } from './entidades-read.component';

describe(EntidadesReadComponent.name, () => {
  let fixture: ComponentFixture<EntidadesReadComponent>;
  let component: EntidadesReadComponent;
  let entidadesService: EntidadesService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesReadComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadesReadComponent);
    component = fixture.componentInstance;
    entidadesService = TestBed.inject(EntidadesService);
    location = TestBed.inject(Location);
  });

  it(`${EntidadesReadComponent.name} DEVE ser criado`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar a listagem das entidades
    QUANDO componente inicializar.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    expect(component.entidades).toBe(ENTIDADES_READ_MOCK);
  });

  it(`(D) DEVE renderizar a coluna 'Nome'
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
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

  it(`(D) DEVE renderizar a coluna 'Endereço'
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('endereco');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Endereço' está incorreto`)
      .toContain('Endereço');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Endereço' está incorreto`)
      .toContain('Endereço teste');
  });

  it(`(D) DEVE renderizar a coluna 'Responsável'
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('responsavel');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Responsável' está incorreto`)
      .toContain('Responsável');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Responsável' está incorreto`)
      .toContain('Responsável teste');
  });

  it(`(D) DEVE renderizar a coluna 'Telefone' com a máscara de número
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('telefone');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Telefone' está incorreto`)
      .toContain('Telefone');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Telefone' está incorreto`)
      .toContain('(99) 99999-9999');
  });

  it(`(D) DEVE renderizar a coluna 'Dias de Visita'
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('dias');

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
      .toContain('Segunda-feira,Terça-feira');
  });

  it(`(D) DEVE renderizar a coluna 'Horário de visita'
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
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
      .withContext(`Cabeçalho da coluna 'Horário de visita' está incorreto`)
      .toContain('Horário de visita');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Horário de visita' está incorreto`)
      .toContain('13:30:00 até 18:30:00');
  });

  it(`(D) DEVE renderizar o botão de edição da entidade
    QUANDO componente receber a listagem das entidades.`, () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
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

  it(`(D) DEVE navegar para edição da entidade
    QUANDO clicar no botão de edição de entidade.`, waitForAsync(async () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[0].nativeElement).click();
    await fixture.whenStable();

    expect(location.path()).toBe('/entidades/update/1');
  }));

  it(`(D) DEVE navegar para exclusão da entidade
    QUANDO clicar no botão de exclusão de entidade.`, waitForAsync(async () => {
    const subject = new Subject<Entidades[]>();
    spyOn(entidadesService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(ENTIDADES_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[1].nativeElement).click();
    await fixture.whenStable();

    expect(location.path()).toBe('/entidades/delete/1');
  }));
});
