import { Connection, JsonRpcProvider, devnetConnection, testnetConnection } from "@mysten/sui.js";

interface Net {
  [key: string]: Connection
}

class Factory {

  static rpcProvider() {
    let networks: Net = {
      "testnet": testnetConnection,
      "devnet": devnetConnection,
    }

    let net = process.env.SUI_NET ?? 'devnet'
    let connection = networks[net];

    return new JsonRpcProvider(connection)
  }
}

export default Factory;