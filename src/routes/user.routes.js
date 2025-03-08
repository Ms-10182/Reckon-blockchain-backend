import { Router } from "express";
import { getUserBalance,transferTokenToUser,transferTokenToAccount } from "../contorllers/user.controller.js";
const router = Router();

router.route("/getBalance").post(getUserBalance);
router.route("/transfer-token-to-user").post(transferTokenToUser);
// router.route("/transfer-token-to-account").post(transferTokenToAccount);

export default router;
