import { Config } from "bili";

const config: Config = {
  input: "src/index.ts",
  output: {
    format: ["cjs", "esm"]
  },
  plugins: {
    typescript2: {
      cacheRoot: "./.cache"
    }
  },
  externals: ["@azure/identity", "@azure/keyvault-secrets"]
};

export default config;
