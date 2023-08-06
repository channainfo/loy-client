import dotenv from "dotenv";
import Keytool from "../libs/keytool";
dotenv.config();

let result = Keytool.toKeysString();
console.log(`${result}`)