//Creo un array de funciones 
const pathsController = {};

//Import la colección que vamos a utilizar
import pathsModel from "../models/path.js";

//SELECT
pathsController.getPath = async (req, res) => {
    const paths = await pathsModel.find();
    res.json(paths);
};

//INSERT
pathsController.insertPaths = async (req, res) => {
    //1. Solicito los datos a guardar
    const { 
        origin,
        destination, 
        distance, 
        estimatedTime
    } = req.body;

    //2. Llenar el modelo con estos datos
    const newPath = new pathsModel({
        origin,
        destination, 
        distance, 
        estimatedTime
    });

    //3. Guardar el empleado en la base de datos
    await newPath.save();

    //4. Devuelvo la respuesta
    res.json({message: "Path saved"});
};

//DELETE
pathsController.deletPath = async (req, res) => {
    await pathsModel.findByIdAndDelete(req.params.id);
    res.json({message:"Path deleted"})
}

//UPDATE
pathsController.updatePath = async (req,res) => {

    //1. Solicito los datos a guardar
    const {         
        origin,
        destination, 
        distance, 
        estimatedTime
    } = req.body;

 
    //#2 Actualizo
    await pathsModel.findByIdAndUpdate(
        req.params.id,
        {
            origin,
            destination, 
            distance, 
            estimatedTime
        },
        {new: true},        
    );
 
    res.json({message: "Path updated"})
};
 
export default pathsController;
