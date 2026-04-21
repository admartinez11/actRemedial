import express from "express";
import loginClientsController from "../controllers/loginClientController.js";
import loginDriversController from "../controllers/loginDriverController.js";

const router = express.Router();

router.route("/").post(loginClientsController.login);
router.route("/").post(loginDriversController.login);

export default router;