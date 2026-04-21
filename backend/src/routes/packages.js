import express from "express";
import packagesController from "../controllers/packagesController.js"
 
//Routes nos ayuda a colocar los metodos
//que tendra el endpoint
 
const router = express.Router();
 
router.route("/")
.get(packagesController.getPackage)
.post(packagesController.insertPackages);
 
router.route("/:id")
.put(packagesController.updatePackage)
.delete(packagesController.deletePackage);
 
export default router;