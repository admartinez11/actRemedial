//Creo un array de funciones 
const packagesController = {};

//Import la colección que vamos a utilizar
import packagesModel from "../models/packages.js";

//SELECT
packagesController.getPackage = async (req, res) => {
    const packages = await packagesModel.find();
    res.json(packages);
};

//INSERT
packagesController.insertPackages = async (req, res) => {
    //1. Solicito los datos a guardar
    const { 
        trackingNumber,
        weight, 
        dimensions, 
        description,
        senderId,
        receiverId,
        status } = req.body;

    //2. Llenar el modelo con estos datos
    const newPackage = new packagesModel({
        trackingNumber,
        weight, 
        dimensions, 
        description,
        senderId,
        receiverId,
        status
    });

    //3. Guardar el empleado en la base de datos
    await newPackage.save();

    //4. Devuelvo la respuesta
    res.json({message: "Package saved"});
};

//DELETE
packagesController.deletePackage = async (req, res) => {
    await packagesModel.findByIdAndDelete(req.params.id);
    res.json({message:"Package deleted"})
}

//UPDATE
packagesController.updatePackage = async (req,res) => {

    //1. Solicito los datos a guardar
    const {         
        trackingNumber,
        weight, 
        dimensions, 
        description,
        senderId,
        receiverId,
        status 
    } = req.body;

 
    //#2 Actualizo
    await packagesModel.findByIdAndUpdate(
        req.params.id,
        {
            trackingNumber,
            weight, 
            dimensions, 
            description,
            senderId,
            receiverId,
            status 
        },
        {new: true},        
    );
 
    res.json({message: "Package updated"})
};
 
export default packagesController;
