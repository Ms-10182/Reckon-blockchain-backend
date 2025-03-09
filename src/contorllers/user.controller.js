import { wallet, provider, contract } from "../index.js";
import { contract_address, tokenAddress } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ethers,Wallet,BigNumber } from 'ethers';

import { customer_address_2 } from "../constants.js";
import { customer_address_1 } from "../constants.js";
import { ApiError } from "../utils/ApiErrors.js";
import { usdt_abi } from "../constants.js";

const getBalance = async (account) => {
  try {
    const balance = await contract.getBalance(account);
    const balanceInInt = parseInt(balance.toString(), 10);
    return { balance, balanceInInt };
  } catch (error) {
    throw new ApiError(500, "Error getting balance");
  }
};

const getUserBalance = asyncHandler(async (req, res) => {
  try {
    const { sender } = req.body;
    const { balance, balanceInInt } = await getBalance(sender);
    res.status(200).json(new ApiResponse(200, { balanceInInt }));
  } catch (error) {
    throw new ApiError(500, "Error getting balance");
  }
});


const transferTokenToAccount = asyncHandler(async (_, res) => {
  const receiver = customer_address_2;
  const { balance, balanceInInt } = await getBalance(customer_address_1);
  const wallet2 = new Wallet(process.env.PRIVATE_KEY_CUSTOMER, provider);

  // Transfer 1 token from customer_address_1 to customer_address_2
  const usdt_contract = new ethers.Contract(tokenAddress, usdt_abi, wallet2);
  try {
    const amount = balance; // Transfer the entire balance
    console.log(`Sending ${amount} tokens to ${receiver}...`);

    const tx = await usdt_contract.transfer(receiver, amount);
    console.log("Transaction sent! Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`Transaction confirmed! Hash: ${receipt.hash}`);
    const { balanceInInt: receiverBalanceInInt } = await getBalance(receiver);

    res
      .status(200)
      .json(new ApiResponse(200, { balanceInInt: receiverBalanceInInt, tx }));
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw new ApiError(500, "Error transferring token");
  }
});

export { getUserBalance, transferTokenToAccount };
