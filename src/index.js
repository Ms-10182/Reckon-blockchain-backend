import { ethers } from 'ethers';
import 'dotenv/config';
import {app} from './app.js';
import { contract_address,contract_abi } from './constants.js';

let contract;
let provider;
let wallet;
try {
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    
    if (!PRIVATE_KEY) {
        throw new Error('Please set your PRIVATE_KEY in the .env file');
    }
    
    provider = new ethers.providers.JsonRpcProvider('https://evmtestnet.confluxrpc.com');
    wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    console.log('Connected to Ethereum testnet with account:', wallet.address);
    
    contract = new ethers.Contract(contract_address, contract_abi, wallet);

    app.on("error", (error) => {
        console.log("error on start the app: ", error);
        throw err;
      });
      app.listen(process.env.PORT, () => {
        console.log("server started at port ", process.env.PORT);
      });

} catch (error) {
    console.error(error);
    process.exit(1);    
}

export { wallet, provider ,contract};
