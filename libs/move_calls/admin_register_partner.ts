import DaiTol from "dai_tol";
import { TransactionBlock } from "@mysten/sui.js";
import Utils from "../utils";
import dotenv from "dotenv";

dotenv.config();

// https://suiexplorer.com/txblock/CqFnXtNyqUPEec2xP65DaFZuuUkgzvTc2d6sMaHFigTU?network=testnet
type TargetID = `${string}::${string}::${string}`;
class AdminRegisterPartner extends DaiTol.Executor {
  public async callAsync() {

    let signer = Utils.signer();
    const tx = new TransactionBlock();

    let name = "CTG";
    let code = "CTG";
    let excerpt = "Contigo";
    let content = "Contigo Community";
    let logoUrl = "https://contigo.xyz/ctg/ctg.png";
    let visibility = 1;
    let tokenName = "CTG";
    let ownerAddress = process.env.SUI_PARTNER_ADDRESS!
    let allowNFT = 1;
    let target: TargetID = `${process.env.SUI_PCK_ADDRESS!}::main::admin_register_partner`;

    tx.moveCall({
      target: target,
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
    console.log(`Call to contract: ${target}`);
    console.log(Utils.transactionBlockURL(result.digest))
  }
}

export default AdminRegisterPartner;