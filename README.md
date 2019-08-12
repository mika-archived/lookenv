# LookEnv

[![GitHub](https://img.shields.io/github/license/mika-f/lookenv?style=flat-square)](./LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@mikazuki/lookenv?style=flat-square)](https://www.npmjs.com/package/@mikazuki/lookenv)

Lookup values from environment variables and cloud secure variables

## Install

```
yarn add @mikazuki/lookenv
```

## How to use

### Environment Variable

```typescript
import LookEnv from "@mikazuki/lookenv";

const env = new LookEnv();

await env.has("NODE_ENV"); // => true
await env.get("NODE_ENV"); // => development
```

You can use type-definitions for parameters, please see below example.

```typescript
import LookEnv from "@mikazuki/lookenv";

type EnvValues = "NODE_ENV";

const env = new LookEnv<EnvValues>();

await env.has("NODE_ENV");         // => compile ok
await env.has("NODE_ENVIRONMENT"); // => compile failure
```

### Custom Variable

```typescript
import LookEnv, { LocalIdentity } from "@mikazuki/lookenv";

const local = new LocalIdentity({ LOCAL_VALUE: "xxx" });
const env = new LookEnv(local);

await env.has("LOCAL_VALUE"); // => true
```

### Azure Key Vault

LookEnv supports Azure Key Vault as Key Store.  
You have to install additional dependencies.

```bash
# install additional dependencies
> yarn add @azure/identity @azure/keyvault-secrets
```

```typescript
import { EnvironmentCredential } from "@azure/identity";
import LookEnv, { AzureIdentity } from "@mikazuki/lookenv";

const azure = new AzureIdentity("<MY KEY VAULT HERE>", new EnvironmentCredential());
const env = new LookEnv(azure);

await env.has("AZURE_KEY_VAULT_SECRET"); // => try to get secret `AzureKeyVaultSecret` from Azure
```

If you want to see real-world example?  
Please check-out [Knockru/Crouton](https://github.com/Knockru/Crouton) repository!