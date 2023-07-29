import { JsonRpcProvider } from "@mysten/sui.js";
import Factory from "../../libs/factory"

describe("Factory", () => {
  describe(".rpcProvider", () => {
    it("returns the JsonRpcProvider instance", () => {
      let rpcProvider = Factory.rpcProvider();

      expect(rpcProvider).toBeInstanceOf(JsonRpcProvider);
    })
  })
})