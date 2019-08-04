import { SecretsClient } from "@azure/keyvault-secrets";

import { IIdentity } from "./interface";

// This is a interface of @azure/identity credentials
interface TokenCredential {
  getToken(scopes: any, options?: any): Promise<any>;
}

export class AzureIdentity implements IIdentity {
  private readonly _client: SecretsClient;

  public constructor(vault: string, credential: TokenCredential) {
    this._client = new SecretsClient(`https://${vault}.vault.azure.net`, credential);
  }

  public async get(name: string, options?: any): Promise<string | undefined> {
    const secret = await this._client.getSecret(this.pascalize(name), options);
    return secret.value;
  }

  private pascalize(str: string): string {
    return str
      .split("_")
      .map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())
      .join("");
  }
}
