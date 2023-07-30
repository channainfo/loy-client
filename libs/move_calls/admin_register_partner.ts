import DaiTol from "dai_tol";
import { TransactionBlock } from "@mysten/sui.js";
import Utils from "../utils";
import dotenv from "dotenv";

dotenv.config();

// https://suiexplorer.com/txblock/CqFnXtNyqUPEec2xP65DaFZuuUkgzvTc2d6sMaHFigTU?network=testnet
class AdminRegisterPartner extends DaiTol.Executor {
  public async callAsync() {

    let signer = Utils.signer();
    const tx = new TransactionBlock();

    let name = "PIZLOY";
    let code = "PIZZA LOY";
    let excerpt = "Pizza Loy Community";
    let content = "zza Loy Community";
    let logoUrl = "https://pizloy.xyz/pizloy/pizloy.png";
    let visibility = 1;
    let tokenName = "PLOY";
    let ownerAddress = process.env.SUI_PARTNER_ADDRESS!
    let allowNFT = 1;

    tx.moveCall({
      target: `${process.env.SUI_PCK_ADDRESS!}::main::admin_register_partner`,
      arguments: [
        tx.pure(`${process.env.SUI_ADMIN_CAP}`),
        tx.pure(name),
        tx.pure(code),
        tx.pure(excerpt),
        tx.pure(content),
        tx.pure(logoUrl),
        tx.pure(visibility),
        tx.pure(tokenName),
        tx.pure(ownerAddress),
        tx.pure(allowNFT),
        tx.pure(`${process.env.SUI_PARTNER_BOARD}`),
      ],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });

    console.log(Utils.transactionBlockURL(result.digest))
  }
}

export default AdminRegisterPartner;