import { wallet, provider, contract } from "../index.js";
import { contract_address } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BigNumber } from "ethers";
import { Wallet } from "ethers";
import { customer_address_2 } from "../constants.js";
import { customer_address_1 } from "../constants.js";

const getBalance = async (account) => {
  const balance = await contract.getBalance(account);
  balance.wait();
  const balanceInInt = parseInt(balance.toString(), 10);
  return { balance, balanceInInt };
};

const getUserBalance = asyncHandler(async (req, res) => {
  const { sender } = req.body;
  const { balance, balanceInInt } = await getBalance(sender);
  res.status(200).json(new ApiResponse(200, { balanceInInt }));
});

const transferTokenToUser = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const amount = BigNumber.from("2000000000000000000"); // 2 * 10^18
  const tx = await contract.requestTokenTransferToUser(receiver, amount);
  tx.wait();

  const { balanceInInt } = await getBalance(receiver);
  res.status(200).json(new ApiResponse(200, { balanceInInt, tx }));
});

const transferTokenToAccount = asyncHandler(async (_, res) => {
  const receiver = customer_address_2;
  const { balance, balanceInInt } = await getBalance(customer_address_1);
  const wallet2 = new Wallet(process.env.PRIVATE_KEY_CUSTOMER, provider);
  
  // Transfer 1 token from customer_address_1 to customer_address_2

  const { balanceInInt: receiverBalanceInInt } = await getBalance(receiver);

  res
    .status(200)
    .json(new ApiResponse(200, { balanceInInt: receiverBalanceInInt, tx }));
});

export { getUserBalance, transferTokenToUser, transferTokenToAccount };
