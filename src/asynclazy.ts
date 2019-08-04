export class AsyncLazy<T> {
  private _factory: () => Promise<T>;
  private _initialized = false;
  private _value: Promise<T> | undefined = undefined;

  public constructor(factory: () => Promise<T>) {
    this._factory = factory;
  }

  public get value(): Promise<T> {
    if (!this._initialized) {
      this._initialized = true;
      this._value = this._factory();
    }

    return this._value!;
  }
}
