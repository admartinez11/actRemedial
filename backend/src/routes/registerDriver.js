import express from "express";
import registerDriverController from "../controllers/registerDriverController.js";

const router = express.Router();

router.route("/").post(registerDriverController.register);
router.route("/verifyCodeEmail").post(registerDriverController.verifyCode);

export default router;