import { Connection, Ed25519Keypair, JsonRpcProvider, PRIVATE_KEY_SIZE, RawSigner, devnetConnection, fromB64, testnetConnection } from "@mysten/sui.js";
import dotenv from "dotenv";

dotenv.config()

interface Net {
  [key: string]: Connection
}

class Utils {
  static keypair(): Ed25519Keypair {
    let keystore = process.env.SUI_ADMIN_KEYSTORE!
    let raw = fromB64(keystore)
    let valid = raw[0] === 0 && raw.length === PRIVATE_KEY_SIZE + 1;

    if (!valid) {
      throw new Error("Invalid key");
    }

    let secretKey = raw.slice(1);
    let keypair = Ed25519Keypair.fromSecretKey(secretKey)
    return keypair;
  }

  static rpcProvider(): JsonRpcProvider {
    let networks: Net = {
      "testnet": testnetConnection,
      "devnet": devnetConnection,
    }

    let net = process.env.SUI_NET ?? 'devnet'
    let connection = networks[net];

    return new JsonRpcProvider(connection)
  }

  static signer(): RawSigner {
    const signer = new RawSigner(this.keypair(), this.rpcProvider());
    return signer;
  }

  static transactionBlockURL(digest: string): string {
    return `https://explorer.sui.io/txblock/${digest}?network=${process.env.SUI_NET}`
  }
}

export default Utils;