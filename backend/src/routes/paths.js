import express from "express";
import pathsController from "../controllers/pathsController.js"
 
//Routes nos ayuda a colocar los metodos
//que tendra el endpoint
 
const router = express.Router();
 
router.route("/")
.get(pathsController.getPath)
.post(pathsController.insertPaths);
 
router.route("/:id")
.put(pathsController.updatePath)
.delete(pathsController.deletPath);
 
export default router;