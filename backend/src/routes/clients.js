import express from "express"
import clientController from "../controllers/clientsController.js"

//usamos Router() de la librería express para definir los métodos HTTP a utilizar
const router = express.Router();

router.route("/")
    .get(clientController.getClient);

router.route("/:id")
    .put(clientController.updateClient)
    .delete(clientController.deleteClient);

export default router;