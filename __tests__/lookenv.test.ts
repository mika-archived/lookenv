import LookEnv from "../src/lookenv";
import LocalIdentity from "../src/identities/local";

function setup() {
  process.env.VARIABLE_1 = "Value1";
  process.env.VARIABLE_3 = "Value3";
}
function cleanup() {
  delete process.env.VARIABLE_1;
  delete process.env.VARIABLE_3;
}

describe("LookEnv#get", () => {
  let env: LookEnv;

  beforeAll(() => setup());

  describe("if identities == [LocalIdentity]", () => {
    beforeAll(() => {
      env = new LookEnv();
    });

    describe("if variable exists in process.env", () => {
      it("returns value", async () => {
        await expect(env.get("VARIABLE_1")).resolves.toBe("Value1");
      });
    });

    describe("if variable does not exists in process.env", () => {
      it("returns undefined", async () => {
        await expect(env.get("VARIABLE_2")).resolves.toBeUndefined();
      });
    });
  });

  describe("if identities == [LocalIdentity<Default>, LocalIdentity<Anonymous>]", () => {
    beforeAll(() => {
      const identity = new LocalIdentity({ VARIABLE_3: "Value13", VARIABLE_10: "Value10", VARIABLE_11: "Value11" });
      env = new LookEnv(identity);
    });

    describe("if variable exists in process.env", () => {
      it("returns value", async () => {
        await expect(env.get("VARIABLE_1")).resolves.toBe("Value1");
      });
    });

    describe("if variable does not exists in process.env, but exists in second store", () => {
      it("returns value", async () => {
        await expect(env.get("VARIABLE_10")).resolves.toBe("Value10");
      });
    });

    describe("if variables exists in both of process.env and second score", () => {
      it("returns 1st store value", async () => {
        await expect(env.get("VARIABLE_3")).resolves.toBe("Value3");
      });
    });

    describe("if variable does not exists in process.env and second store", () => {
      it("returns undefined", async () => {
        await expect(env.get("VARIABLE_2")).resolves.toBeUndefined();
      });
    });
  });

  afterAll(() => cleanup());
});

describe("LookEnv#has", () => {
  let env: LookEnv;

  beforeAll(() => setup());

  describe("if identities == [LocalIdentity]", () => {
    beforeAll(() => {
      env = new LookEnv();
    });

    describe("if specified variable exists in process.env", () => {
      it("returns true", async () => {
        await expect(env.has("VARIABLE_1")).resolves.toBeTruthy();
      });
    });

    describe("if specified variables exists in process.env", () => {
      it("returns true", async () => {
        await expect(env.has("VARIABLE_1", "VARIABLE_3")).resolves.toBeTruthy();
      });
    });

    describe("if specified variable does not exists in process.env", () => {
      it("returns false", async () => {
        await expect(env.has("VARIABLE_2")).resolves.toBeFalsy();
      });
    });

    describe("if one of specified variables does not exists in process.env", () => {
      it("returns false", async () => {
        await expect(env.has("VARIABLE_1", "VARIABLE_2")).resolves.toBeFalsy();
      });
    });

    describe("if specified variables does not exists in process.env", () => {
      it("returns false", async () => {
        await expect(env.has("VARIABLE_2", "VARIABLE_4")).resolves.toBeFalsy();
      });
    });
  });

  describe("if identities == [LocalIdentity<Default>, LocalIdentity<Anonymous>]", () => {
    beforeAll(() => {
      const identity = new LocalIdentity({ VARIABLE_3: "Value13", VARIABLE_10: "Value10", VARIABLE_11: "Value11" });
      env = new LookEnv(identity);
    });

    describe("if specified variable exists in process.env", () => {
      it("returns true", async () => {
        await expect(env.has("VARIABLE_1")).resolves.toBeTruthy();
      });
    });

    describe("if specified variables exists in process.env", () => {
      it("returns true", async () => {
        await expect(env.has("VARIABLE_1", "VARIABLE_3")).resolves.toBeTruthy();
      });
    });

    describe("if specified variables does not exist in process.env, but exists in 2nd store", () => {
      it("returns true", async () => {
        await expect(env.has("VARIABLE_10", "VARIABLE_11")).resolves.toBeTruthy();
      });
    });

    describe("if one of specified variables does not exists in process.env and 2nd store", () => {
      it("returns false", async () => {
        await expect(env.has("VARIABLE_1", "VARIABLE_10", "VARIABLE_100")).resolves.toBeFalsy();
      });
    });
  });

  afterAll(() => cleanup());
});
