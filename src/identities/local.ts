import { IIdentity } from "./interface";

type Dictionary = { [key: string]: string | undefined };

export class LocalIdentity implements IIdentity {
  private readonly _store: Dictionary;

  public constructor(_store: Dictionary = process.env) {
    this._store = _store;
  }

  public get(name: string, _?: any): Promise<string | undefined> {
    return new Promise<string>((resolve, reject) => {
      resolve(this._store[name]);
    });
  }
}
