import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vlibras',
  imports: [],
  templateUrl: './vlibras.component.html',
  styleUrl: './vlibras.component.css',
  standalone: true,
})
export class VlibrasComponent implements OnInit {
  @Input()
  public rootPath: string = 'https://vlibras.gov.br/app';

  @Input()
  public personalization!: string;

  @Input()
  public opacity: number = 0.75;

  @Input()
  public position: string = 'BR';

  @Input()
  public avatar: string = 'icaro';

  private _vlibrasSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  private _unlistenFn!: () => void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _renderer2: Renderer2,
    private window: Window
  ) {
    this._onLoadScript = this._onLoadScript.bind(this);
  }

  ngOnInit(): void {
    const vlibrasScript = this._renderer2.createElement('script');

    this._renderer2.setAttribute(vlibrasScript, 'type', 'text/javascript');
    this._renderer2.setAttribute(vlibrasScript, 'src', this._vlibrasSrc);
    this._renderer2.appendChild(this.document.head, vlibrasScript);

    this._unlistenFn = this._renderer2.listen(vlibrasScript, 'load', () =>
      this._onLoadScript()
    );
  }

  private _onLoadScript(): void {
    if ('VLibras' in this.window) {
      const VLibras = <any>this.window.VLibras;

      new VLibras.Widget({
        rootPath: this.rootPath,
        personalization: this.personalization,
        opacity: this.opacity,
        position: this.position,
        avatar: this.avatar,
      });
    }

    if (this._unlistenFn) {
      this._unlistenFn();
    }
  }
}
