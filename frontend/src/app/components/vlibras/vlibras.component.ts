import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vlibras',
  imports: [],
  templateUrl: './vlibras.component.html',
  styleUrl: './vlibras.component.css',
  standalone: true
})
export class VlibrasComponent implements OnInit {

  @Input()
  public rootPath: string = 'https://vlibras.gov.br/app'

  @Input()
  public personalization!: string

  @Input()
  public opacity: number = 0.75

  @Input()
  public position: string = 'BR'

  @Input()
  public avatar: string = 'icaro'

  protected vlibrasSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js'
  private vLibrasScriptEl!: HTMLScriptElement
  private vLibrasWidget!: any

  constructor(@Inject(DOCUMENT) private document: Document, private window: Window){
    this._onLoadScript = this._onLoadScript.bind(this)
  }

  ngOnInit(): void {
    const headerEl = this.document.querySelector('head')
    const vlibrasScript = this.document.createElement('script')
    vlibrasScript.src = this.vlibrasSrc
    this.vLibrasScriptEl = vlibrasScript

    vlibrasScript.addEventListener('load', this._onLoadScript)
    headerEl?.appendChild(vlibrasScript)
  }

  private _onLoadScript(): void {
    if('VLibras' in this.window) {
      const VLibras = <any>this.window.VLibras

      this.vLibrasWidget = new VLibras.Widget( {
        rootPath: this.rootPath,
        personalization: this.personalization,
        opacity: this.opacity,
        position: this.position,
        avatar: this.avatar
      });
    }

    this.vLibrasScriptEl.removeEventListener('load', this._onLoadScript)
  }
}
