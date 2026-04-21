import express from "express";
import shipmentsController from "../controllers/shipmentsController.js"
 
//Routes nos ayuda a colocar los metodos
//que tendra el endpoint
 
const router = express.Router();
 
router.route("/")
.get(shipmentsController.getShipment)
.post(shipmentsController.insertShipments);
 
router.route("/:id")
.put(shipmentsController.updateShipment)
.delete(shipmentsController.deleteShipment);
 
export default router;