import { Ed25519Keypair, JsonRpcProvider, RawSigner } from "@mysten/sui.js";
import Utils from "../../libs/utils";

describe("Utils", () => {
  describe(".rpcProvider", () => {
    it("returns the JsonRpcProvider instance", () => {
      let rpcProvider = Utils.rpcProvider();
      expect(rpcProvider).toBeInstanceOf(JsonRpcProvider);
    })
  })

  describe(".keypair", () => {
    it("returns the Ed25519Keypair instance", () => {
      let keypair = Utils.keypair();
      expect(keypair).toBeInstanceOf(Ed25519Keypair);
    })
  })

  describe(".signer", () => {
    it("returns the RawSigner instance", () => {
      let signer = Utils.signer();
      expect(signer).toBeInstanceOf(RawSigner);
    })
  })
})
