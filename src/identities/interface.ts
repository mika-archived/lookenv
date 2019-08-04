export interface IIdentity {
  get(name: string, options?: any): Promise<string | undefined>;
}
