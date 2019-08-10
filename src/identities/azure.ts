import { AsyncLazy } from "@mikazuki/lazy-class";
import { IIdentity } from "./interface";

// This is a interface of @azure/identity credentials
interface TokenCredential {
  getToken(scopes: any, options?: any): Promise<any>;
}

export class AzureIdentity implements IIdentity {
  private readonly _client: AsyncLazy<import("@azure/keyvault-secrets").SecretsClient>;

  public constructor(vault: string, credential: TokenCredential) {
    this._client = new AsyncLazy(async () => await import("@azure/keyvault-secrets").then(w => new w.SecretsClient(`https://${vault}.vault.azure.net`, credential)));
  }

  public async get(name: string, options?: any): Promise<string | undefined> {
    const secret = await (await this._client.value!).getSecret(this.pascalize(name), options);
    return secret.value;
  }

  private pascalize(str: string): string {
    return str
      .split("_")
      .map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())
      .join("");
  }
}
