import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { contract } from "../index.js";

const addCheckpoint = asyncHandler(async (req, res) => {
    const { id, city, longitude, latitude } = req.body;
    if ([id, city, longitude, latitude].some((item) => item?.trim() === ""))
      throw new ApiError(400, "All fields are required");
    try {
      const tx = await contract.addCheckpoint(id, city, longitude, latitude);
      await tx.wait();
    } catch (error) {
      console.log(error);
      throw new ApiError(500, "Error adding checkpoint", error);
    }
    res
      .status(200)
      .json(new ApiResponse(200, "checkpoint added sucessfully"));
});

const getCheckpoints = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!id){
      throw new ApiError(400, "id is required");
    }
    const checkpoints = await contract.getCheckpoints(id);
    if (!checkpoints
      || checkpoints.length === 0) {
      throw new ApiError(404, "No checkpoints found for this id");
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, { checkpoints }, "checkpoints fetched sucessfully")
      );
  });

export { addCheckpoint, getCheckpoints };
