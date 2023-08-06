import { Ed25519Keypair, PRIVATE_KEY_SIZE, fromB64, toB64 } from "@mysten/sui.js";
import dotenv from "dotenv";
import Utils from "./utils";
import { ChildProcess, exec, execSync } from "child_process";

dotenv.config()

class Keytool {
  public static publicKey() {
    let keypair = Utils.keypair();
    return keypair.getPublicKey().toSuiAddress();
  }

  // 0x95b368f5dca6e484b5c1c9ba8a5faf1e77dba73c7a524f3aa5c84ff7e789fae0
  public static privateKey(): string {
    let keystore = process.env.SUI_ADMIN_KEYSTORE!;
    let command = `sui keytool convert ${keystore}`
    let stdout = execSync(command, { stdio: 'pipe' });

    return `0x${stdout}`;
  }

  public static toKeysString(): string {
    let privateKey = Keytool.privateKey();
    let publicKey = Keytool.publicKey();

    let format = `
      Private key: ${privateKey}
      Public key: ${publicKey}
    `;

    return format;
  }
}

export default Keytool;