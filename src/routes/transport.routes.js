import { Router } from "express";
import { addCheckpoint, getCheckpoints } from "../contorllers/transport.controller.js"; 

const router = Router();

router.route("/addCheckpoint").post(addCheckpoint);
router.route("/getCheckpoints/:id").get(getCheckpoints);

export default router;