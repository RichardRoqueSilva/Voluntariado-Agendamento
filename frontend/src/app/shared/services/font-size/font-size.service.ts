import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  public fontSizeRem$!: Observable<number>;
  private _fontSizeSubject!: BehaviorSubject<number>;
  private _fontSize!: number;

  constructor() {
    this._initObservalbe();
  }

  public notifyFontSizeChange(newFontSizeRem: number): void {
    if (this._fontSize == newFontSizeRem) {
      return;
    }

    this._fontSize = newFontSizeRem;
    this._fontSizeSubject.next(newFontSizeRem);
  }

  private _initObservalbe(): void {
    this._fontSize = 1;
    this._fontSizeSubject = new BehaviorSubject<number>(this._fontSize);
    this.fontSizeRem$ = this._fontSizeSubject.asObservable();
  }
}
