//Creo un array de funciones 
const shipmentsController = {};

//Import la colección que vamos a utilizar
import shipmentsModel from "../models/shipments.js";

//SELECT
shipmentsController.getShipment = async (req, res) => {
    const shipments = await shipmentsModel.find();
    res.json(shipments);
};

//INSERT
shipmentsController.insertShipments = async (req, res) => {
    //1. Solicito los datos a guardar
    const { 
        packageId,
        pathId, 
        driverId, 
        carId,
        departureDate,
        deliveryDate,
        status 
    } = req.body;

    //2. Llenar el modelo con estos datos
    const newShipment = new shipmentsModel({
        packageId,
        pathId, 
        driverId, 
        carId,
        departureDate,
        deliveryDate,
        status 
    });

    //3. Guardar el empleado en la base de datos
    await newShipment.save();

    //4. Devuelvo la respuesta
    res.json({message: "Shipment saved"});
};

//DELETE
shipmentsController.deleteShipment = async (req, res) => {
    await shipmentsModel.findByIdAndDelete(req.params.id);
    res.json({message:"Shipment deleted"})
}

//UPDATE
shipmentsController.updateShipment = async (req,res) => {

    //1. Solicito los datos a guardar
    const {         
        packageId,
        pathId, 
        driverId, 
        carId,
        departureDate,
        deliveryDate,
        status 
    } = req.body;

 
    //#2 Actualizo
    await shipmentsModel.findByIdAndUpdate(
        req.params.id,
        {
            packageId,
            pathId, 
            driverId, 
            carId,
            departureDate,
            deliveryDate,
            status 
        },
        {new: true},        
    );
 
    res.json({message: "Shipment updated"})
};
 
export default shipmentsController;
