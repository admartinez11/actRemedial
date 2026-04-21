import express from "express";
import carsController from "../controllers/carsController.js"
 
//Routes nos ayuda a colocar los metodos
//que tendra el endpoint
 
const router = express.Router();
 
router.route("/")
.get(carsController.getCar)
.post(carsController.insertCars);
 
router.route("/:id")
.put(carsController.updateCar)
.delete(carsController.deleteCar);
 
export default router;