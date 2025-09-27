export class LocalStorageMock {
  public mapa = new Map<string, string>();

  public getItem(key: string): string | null {
    const value = this.mapa.get(key);
    return value ?? null;
  }

  public setItem(key: string, value: string): void {
    this.mapa.set(key, value);
  }
}
