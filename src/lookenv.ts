import { IIdentity } from "./identities/interface";
import { LocalIdentity } from "./identities/local";

export class LookEnv<T extends string = string> {
  private readonly _caches: { [key: string]: string };
  private readonly _identities: IIdentity[];

  public constructor(...identities: IIdentity[]) {
    identities.unshift(new LocalIdentity()); // LookEnv searches the local store at the first.

    this._caches = {};
    this._identities = identities;
  }

  public async get(name: T): Promise<string | undefined> {
    if (this._caches[name]) return this._caches[name];

    for (let identity of this._identities) {
      const value = await identity.get(name);
      if (value) return (this._caches[name] = value);
    }

    return undefined;
  }

  public async has(...names: T[]): Promise<boolean> {
    let bool = true;
    for (let name of names) {
      bool = bool && !!(await this.get(name));
      if (!bool) break;
    }

    return bool;
  }
}
