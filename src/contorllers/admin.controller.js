import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { contract } from "../index.js";
import { BigNumber } from "ethers";

const getBalance = async (account) => {
    try {
      const balance = await contract.getBalance(account);
      const balanceInInt = parseInt(balance.toString(), 10);
      return { balance, balanceInInt };
    } catch (error) {
      throw new ApiError(500, "Error getting balance");
    }
  };
  
const addOwner = asyncHandler(async (req, res) => {
  const { owner } = req.body;
  try {
    const tx = await contract.addOwner(owner);
    await tx.wait();
    res.status(200).json(new ApiResponse(200, "Admin added successfully"));
  } catch (error) {
    throw new ApiError(500, "Error adding admin", error);
  }
});

const addDispatcher = asyncHandler(async (req, res) => {
  const { dispatcher } = req.body;
  try {
    const tx = await contract.addDispatcher(dispatcher);
    await tx.wait();
    res.status(200).json(new ApiResponse(200, "Dispatcher added successfully"));
  } catch (error) {
    throw new ApiError(500, "Error adding dispatcher", error);
  }
});

const transferTokenToUser = asyncHandler(async (req, res) => {
  try {
    const { receiver } = req.body;
    const amount = BigNumber.from("2000000000000000000"); // 2 * 10^18
    const tx = await contract.requestTokenTransferToUser(receiver, amount);
    await tx.wait();

    const { balanceInInt } = await getBalance(receiver);
    res.status(200).json(new ApiResponse(200, { balanceInInt, tx }));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error transferring token");
  }
});

export { addOwner, addDispatcher, transferTokenToUser };
