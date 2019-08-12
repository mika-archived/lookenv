import { IIdentity } from "./identities/interface";
import LocalIdentity from "./identities/local";

export default class LookEnv<T extends string = string> {
  private readonly caches: { [key: string]: string };

  private readonly identities: IIdentity[];

  public constructor(...identities: IIdentity[]) {
    identities.unshift(new LocalIdentity()); // LookEnv searches the local store at the first.

    this.caches = {};
    this.identities = identities;
  }

  public async get(name: T): Promise<string | undefined> {
    if (this.caches[name]) return this.caches[name];

    // eslint-disable-next-line no-restricted-syntax
    for (const identity of this.identities) {
      // eslint-disable-next-line no-await-in-loop
      const value = await identity.get(name);
      if (value) {
        this.caches[name] = value;
        return value;
      }
    }

    return undefined;
  }

  public async has(...names: T[]): Promise<boolean> {
    const promises = await Promise.all(names.map(w => this.get(w)));
    return promises.every(w => !!w);
  }
}
