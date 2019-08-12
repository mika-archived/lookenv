import { IIdentity } from "./interface";

type Dictionary = { [key: string]: string | undefined };

export default class LocalIdentity implements IIdentity {
  private readonly store: Dictionary;

  public constructor(store: Dictionary = process.env) {
    this.store = store;
  }

  public get(name: string): Promise<string | undefined> {
    return new Promise<string>(resolve => {
      resolve(this.store[name]);
    });
  }
}
