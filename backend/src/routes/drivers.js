import express from "express"
import driversController from "../controllers/driversController.js"

//usamos Router() de la librería express para definir los métodos HTTP a utilizar
const router = express.Router();

router.route("/")
    .get(driversController.getDriver);

router.route("/:id")
    .put(driversController.updateDriver)
    .delete(driversController.deleteDriver);

export default router;