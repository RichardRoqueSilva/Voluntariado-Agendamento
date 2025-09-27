import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { routes } from '../../../app.routes';
import { TestingModule } from '../../../shared/tests';
import { VOLUNTARIOS_READ_MOCK } from '../mock/voluntarios-read-mock';
import { Voluntarios } from '../voluntarios.model';
import { VoluntariosService } from '../voluntarios.service';
import { VoluntariosReadComponent } from './voluntarios-read.component';

describe(VoluntariosReadComponent.name, () => {
  let fixture: ComponentFixture<VoluntariosReadComponent>;
  let component: VoluntariosReadComponent;
  let voluntariosService: VoluntariosService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntariosReadComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntariosReadComponent);
    component = fixture.componentInstance;
    voluntariosService = TestBed.inject(VoluntariosService);
    location = TestBed.inject(Location);
  });

  it(`${VoluntariosReadComponent.name} DEVE ser criado`, () => {
    expect(component).toBeTruthy();
  });

  it(`DEVE buscar a listagem dos voluntários
    QUANDO componente inicializar.`, () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
    expect(component.voluntarios).toBe(VOLUNTARIOS_READ_MOCK);
  });

  it(`(D) DEVE renderizar a coluna 'Nome'
    QUANDO componente receber a listagem dos voluntários.`, () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
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
      .toContain('Nome');
  });

  it(`(D) DEVE renderizar a coluna 'Celular' com a máscara de número
    QUANDO componente receber a listagem dos voluntários.`, () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('celular');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Celular' está incorreto`)
      .toContain('Celular');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Celular' está incorreto`)
      .toContain('(99) 99999-9999');
  });

  it(`(D) DEVE renderizar a coluna 'Observação'
    QUANDO componente receber a listagem dos voluntários.`, () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
    fixture.detectChanges();

    const celulasCabecalhoTabela = fixture.debugElement.queryAll(
      By.css('thead tr th')
    );
    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('observacao');

    expect(
      (<HTMLTableCellElement>celulasCabecalhoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Cabeçalho da coluna 'Observação' está incorreto`)
      .toContain('Observação');

    expect(
      (<HTMLTableCellElement>celulasConteudoTabela[indiceColuna].nativeElement)
        .textContent
    )
      .withContext(`Conteúdo da coluna 'Observação' está incorreto`)
      .toContain('Obs');
  });

  it(`(D) DEVE renderizar o botão de edição do voluntário
    QUANDO componente receber a listagem dos voluntários.`, () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
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

  it(`(D) DEVE navegar para edição do voluntário
    QUANDO clicar no botão de edição de voluntário.`, waitForAsync(async () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[0].nativeElement).click();
    await fixture.whenStable();

    expect(location.path()).toBe('/voluntarios/update/1');
  }));

  it(`(D) DEVE navegar para exclusão do voluntário
    QUANDO clicar no botão de exclusão de voluntário.`, waitForAsync(async () => {
    const subject = new Subject<Voluntarios[]>();
    spyOn(voluntariosService, 'read').and.returnValue(subject.asObservable());

    fixture.detectChanges();
    subject.next(VOLUNTARIOS_READ_MOCK);
    fixture.detectChanges();

    const celulasConteudoTabela = fixture.debugElement.queryAll(
      By.css('tbody tr td')
    );

    const indiceColuna = component.displayedColumns.indexOf('action');
    const botoes = celulasConteudoTabela[indiceColuna].queryAll(By.css('a'));

    (<HTMLButtonElement>botoes[1].nativeElement).click();
    await fixture.whenStable();

    expect(location.path()).toBe('/voluntarios/delete/1');
  }));
});
