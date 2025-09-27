import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  LocalStorageKey,
  LocalStorageService,
} from '../../services/local-storage';
import { TestingModule } from '../../tests';
import { FontResizeBtnComponent } from './font-resize-btn.component';

describe(FontResizeBtnComponent.name, () => {
  let fixture: ComponentFixture<FontResizeBtnComponent>;
  let component: FontResizeBtnComponent;
  let window: Window;
  let localStorageService: LocalStorageService;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontResizeBtnComponent, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FontResizeBtnComponent);
    component = fixture.componentInstance;
    window = TestBed.inject(Window);
    localStorageService = TestBed.inject(LocalStorageService);

    const doc = fixture.nativeElement.ownerDocument;
    htmlElement = doc.querySelector('html') as HTMLElement;
    htmlElement.style.fontSize = '16px';
  });

  it(`${FontResizeBtnComponent.name} DEVE ser criado`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) DEVE obter o tamanho de fonte padrão do html
    QUANDO componente for criado e não possuir tamanho de fonte salvo no localStorage.`, () => {
    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(fontSizeHtmlRem);
  });

  it(`(D) DEVE obter o tamanho de fonte padrão do html
    QUANDO componente for criado e possuir tamanho de fonte não numérico, salvo no localStorage`, () => {
    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    localStorageService.salvarNoLocalStorage(
      LocalStorageKey.TAMANHO_FONTE,
      'a'
    );

    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(fontSizeHtmlRem);
  });

  it(`DEVE não extrapolar o valor do limite superior do tamanho da fonte (${FontResizeBtnComponent.LIMITE_TAMANHO_MAXIMO}px)
    QUANDO for feita uma tentativa de incrementar uma fonte que já está no tamanho máximo.`, () => {
    htmlElement.style.fontSize = `${
      FontResizeBtnComponent.LIMITE_TAMANHO_MAXIMO * 16
    }px`;
    const fontSizeHtmlRem =
      parseFloat(htmlElement.style.fontSize.replaceAll('px', '')) / 16;

    fixture.detectChanges();
    component.aumentarFontSize();

    expect(component.currentFontSizeEmRem).toBe(fontSizeHtmlRem);
  });

  it(`DEVE não extrapolar o valor do limite inferior do tamanho da fonte (${FontResizeBtnComponent.LIMITE_TAMANHO_MINIMO}px)
    QUANDO for feita uma tentativa de incrementar uma fonte que já está no tamanho máximo.`, () => {
    htmlElement.style.fontSize = `${
      FontResizeBtnComponent.LIMITE_TAMANHO_MINIMO * 16
    }px`;
    const fontSizeHtmlRem =
      parseFloat(htmlElement.style.fontSize.replaceAll('px', '')) / 16;

    fixture.detectChanges();
    component.diminuirFontSize();

    expect(component.currentFontSizeEmRem).toBe(fontSizeHtmlRem);
  });

  it(`DEVE retornar o do tamanho da fonte 1rem
    QUANDO ler tamanho da fonte do elemento HTML da página, e ele não possuir tamanho definido.`, () => {
    htmlElement.style.fontSize = ``;

    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(1);
  });

  it(`(D) DEVE obter o tamanho de fonte salva no localStorage
    QUANDO componente for criado e possuir tamanho de fonte salvo no localStorage.`, () => {
    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    localStorageService.salvarNoLocalStorage(LocalStorageKey.TAMANHO_FONTE, 2);

    fixture.detectChanges();

    const fontSizeLocalStorageRem = parseFloat(
      localStorageService.lerDoLocalStorage(
        LocalStorageKey.TAMANHO_FONTE
      ) as string
    );

    expect(component.currentFontSizeEmRem).not.toBe(fontSizeHtmlRem);
    expect(component.currentFontSizeEmRem).toBe(fontSizeLocalStorageRem);
  });

  it(`(D) DEVE exibir botões de aumentar, diminuir e restaurar tamanho da fonte da página
    QUANDO clicado no botão de alteração de tamanho da fonte.`, () => {
    fixture.detectChanges();

    const btnAlterarTamanho = fixture.debugElement.query(
      By.css('#btn-alterar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    btnAlterarTamanho.click();
    fixture.detectChanges();

    const btnAumentar = fixture.debugElement.query(
      By.css('#btn-aumentar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    const btnDiminuir = fixture.debugElement.query(
      By.css('#btn-diminuir-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    const btnRestaurar = fixture.debugElement.query(
      By.css('#btn-restaurar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;

    expect(btnAumentar).toBeTruthy();
    expect(btnDiminuir).toBeTruthy();
    expect(btnRestaurar).toBeTruthy();
  });

  it(`(D) DEVE ocultar botões para alterar tamanho da fonte da página
    QUANDO clicado no botão de alteração de tamanho da fonte e os botões de aumentar, diminuir e restaurar tamanho já estavam sendo exibidos.`, () => {
    fixture.detectChanges();

    const btnAlterarTamanho = fixture.debugElement.query(
      By.css('#btn-alterar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    btnAlterarTamanho.click();
    fixture.detectChanges();

    btnAlterarTamanho.click();
    fixture.detectChanges();

    const btnAumentar = fixture.debugElement.query(
      By.css('#btn-aumentar-tamanho-fonte')
    );
    const btnDiminuir = fixture.debugElement.query(
      By.css('#btn-diminuir-tamanho-fonte')
    );
    const btnRestaurar = fixture.debugElement.query(
      By.css('#btn-restaurar-tamanho-fonte')
    );

    expect(btnAumentar).toBeFalsy();
    expect(btnDiminuir).toBeFalsy();
    expect(btnRestaurar).toBeFalsy();
  });

  it(`DEVE incrementar o tamanho da fonte da página
    QUANDO clicado no botão de aumentar tamanho da fonte.`, () => {
    fixture.detectChanges();

    const tamanhoAnterior = component.currentFontSizeEmRem;

    component.aumentarFontSize();
    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(
      tamanhoAnterior + FontResizeBtnComponent.INCREMENTO_TAMANHO
    );
  });

  it(`(D) DEVE incrementar o tamanho da fonte de toda a página
    QUANDO clicado no botão de aumentar tamanho da fonte.`, () => {
    fixture.detectChanges();

    const tamanhoAnterior = component.currentFontSizeEmRem;

    const btnAlterarTamanho = fixture.debugElement.query(
      By.css('#btn-alterar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    btnAlterarTamanho.click();
    fixture.detectChanges();

    const btnAumentar = fixture.debugElement.query(
      By.css('#btn-aumentar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;

    btnAumentar.click();

    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    expect(component.currentFontSizeEmRem).toBe(
      tamanhoAnterior + FontResizeBtnComponent.INCREMENTO_TAMANHO
    );
    expect(fontSizeHtmlRem).toBe(component.currentFontSizeEmRem);
  });

  it(`DEVE salvar tamanho da fonte da página
    QUANDO incrementar tamanho da fonte.`, () => {
    fixture.detectChanges();
    component.aumentarFontSize();

    const tamanhoFonte = parseFloat(
      localStorageService.lerDoLocalStorage(
        LocalStorageKey.TAMANHO_FONTE
      ) as string
    );

    expect(component.currentFontSizeEmRem).toBe(tamanhoFonte);
  });

  it(`DEVE decrementar o tamanho da fonte da página
    QUANDO clicado no botão de diminuir tamanho da fonte.`, () => {
    fixture.detectChanges();

    const tamanhoAnterior = component.currentFontSizeEmRem;

    component.diminuirFontSize();
    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(
      tamanhoAnterior - FontResizeBtnComponent.INCREMENTO_TAMANHO
    );
  });

  it(`(D) DEVE decrementar o tamanho da fonte de toda a página
    QUANDO clicado no botão de diminuir tamanho da fonte.`, () => {
    fixture.detectChanges();

    const tamanhoAnterior = component.currentFontSizeEmRem;

    const btnAlterarTamanho = fixture.debugElement.query(
      By.css('#btn-alterar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    btnAlterarTamanho.click();
    fixture.detectChanges();

    const btnDiminuir = fixture.debugElement.query(
      By.css('#btn-diminuir-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;

    btnDiminuir.click();

    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    expect(component.currentFontSizeEmRem).toBe(
      tamanhoAnterior - FontResizeBtnComponent.INCREMENTO_TAMANHO
    );
    expect(fontSizeHtmlRem).toBe(component.currentFontSizeEmRem);
  });

  it(`DEVE salvar tamanho da fonte da página
    QUANDO decrementar tamanho da fonte.`, () => {
    fixture.detectChanges();
    component.diminuirFontSize();

    const tamanhoFonte = parseFloat(
      localStorageService.lerDoLocalStorage(
        LocalStorageKey.TAMANHO_FONTE
      ) as string
    );

    expect(component.currentFontSizeEmRem).toBe(tamanhoFonte);
  });

  it(`DEVE restaurar o tamanho da fonte da página
    QUANDO clicado no botão de restaurar tamanho da fonte.`, () => {
    fixture.detectChanges();

    component.restaurarFontSize();
    fixture.detectChanges();

    expect(component.currentFontSizeEmRem).toBe(1);
  });

  it(`(D) DEVE restaurar o tamanho da fonte de toda a página
    QUANDO clicado no botão de restaurar tamanho da fonte.`, () => {
    fixture.detectChanges();

    const btnAlterarTamanho = fixture.debugElement.query(
      By.css('#btn-alterar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;
    btnAlterarTamanho.click();
    fixture.detectChanges();

    const btnRestaurar = fixture.debugElement.query(
      By.css('#btn-restaurar-tamanho-fonte')
    ).nativeElement as HTMLButtonElement;

    btnRestaurar.click();

    const computedStyle = window.getComputedStyle(htmlElement);
    const fontSizeHtmlPx = computedStyle.fontSize;
    const fontSizeHtmlRem =
      parseFloat(fontSizeHtmlPx.replaceAll('px', '')) / 16;

    expect(component.currentFontSizeEmRem).toBe(1);
    expect(fontSizeHtmlRem).toBe(component.currentFontSizeEmRem);
  });

  it(`DEVE salvar tamanho da fonte da página
    QUANDO restaurar tamanho da fonte.`, () => {
    fixture.detectChanges();
    component.diminuirFontSize();

    const tamanhoFonte = parseFloat(
      localStorageService.lerDoLocalStorage(
        LocalStorageKey.TAMANHO_FONTE
      ) as string
    );

    expect(component.currentFontSizeEmRem).toBe(tamanhoFonte);
  });
});
