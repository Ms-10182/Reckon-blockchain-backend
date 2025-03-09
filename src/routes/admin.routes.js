import { addOwner, addDispatcher, transferTokenToUser } from "../contorllers/admin.controller.js";
import { Router } from "express";   
const router = Router();

router.route("/addOwner").post(addOwner);
router.route("/addDispatcher").post(addDispatcher);
router.route("/transfer-token-to-user").post(transferTokenToUser);
export default router;
