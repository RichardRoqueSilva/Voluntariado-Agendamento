import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  computed,
  Inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  LocalStorageKey,
  LocalStorageService,
} from '../../services/local-storage';

@Component({
  selector: 'app-font-resize-btn',
  templateUrl: './font-resize-btn.component.html',
  styleUrl: './font-resize-btn.component.css',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class FontResizeBtnComponent implements OnInit {
  public currentFontSizeEmRem!: number;
  protected controlesExpandidos = signal(false);

  public classesContainer!: Signal<Record<string, boolean>>;

  public static readonly INCREMENTO_TAMANHO = 0.25;
  public static readonly LIMITE_TAMANHO_MAXIMO = 10;
  public static readonly LIMITE_TAMANHO_MINIMO = 0.5;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _window: Window,
    private _localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.currentFontSizeEmRem = this._getTamanhoFonteAtualEmRem();
    this._atualizaTamanhoFonte();
    this.classesContainer = computed(() => {
      return {
        'font-resize-container': true,
        'font-resize-container-expandido': this.controlesExpandidos(),
      };
    });
  }

  public toggleExibicao() {
    this.controlesExpandidos.set(!this.controlesExpandidos());
  }

  public restaurarFontSize(): void {
    this.currentFontSizeEmRem = 1;
    this._atualizaTamanhoFonte();
  }

  public aumentarFontSize(): void {
    const novoValor =
      this.currentFontSizeEmRem + FontResizeBtnComponent.INCREMENTO_TAMANHO;
    if (novoValor >= FontResizeBtnComponent.LIMITE_TAMANHO_MAXIMO) {
      return;
    }
    this.currentFontSizeEmRem = novoValor;
    this._atualizaTamanhoFonte();
  }

  public diminuirFontSize(): void {
    const novoValor =
      this.currentFontSizeEmRem - FontResizeBtnComponent.INCREMENTO_TAMANHO;
    if (novoValor <= FontResizeBtnComponent.LIMITE_TAMANHO_MINIMO) {
      return;
    }

    this.currentFontSizeEmRem = novoValor;
    this._atualizaTamanhoFonte();
  }

  private _atualizaTamanhoFonte(): void {
    this._document.documentElement.style.fontSize = `${this.currentFontSizeEmRem}rem`;
    this._localStorageService.salvarNoLocalStorage(
      LocalStorageKey.TAMANHO_FONTE,
      this.currentFontSizeEmRem
    );
  }

  private _getTamanhoFonteAtualEmRem(): number {
    const tamanhoFonteLocalStorage = this._getTamanhoFonteLocalStorage();

    if (
      tamanhoFonteLocalStorage &&
      tamanhoFonteLocalStorage > FontResizeBtnComponent.LIMITE_TAMANHO_MINIMO &&
      tamanhoFonteLocalStorage < FontResizeBtnComponent.LIMITE_TAMANHO_MAXIMO
    ) {
      return tamanhoFonteLocalStorage;
    }

    return this._getTamanhoFonteBody();
  }

  private _getTamanhoFonteLocalStorage(): number | null {
    return this._localStorageService.lerDoLocalStorage<number>(
      LocalStorageKey.TAMANHO_FONTE
    );
  }

  private _getTamanhoFonteBody(): number {
    const computedStyle = this._window.getComputedStyle(
      this._document.documentElement
    );
    const fontSizeEmPx = computedStyle.fontSize;

    const valorFontSize = parseFloat(fontSizeEmPx.replace('px', ''));

    if (isNaN(valorFontSize)) {
      return 1;
    }

    return isNaN(valorFontSize) ? 1 : valorFontSize / 16; // 16px é o valor padrão para 1rem
  }
}
