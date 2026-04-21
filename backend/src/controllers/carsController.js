//Creo un array de funciones 
const carsController = {};

//Import la colección que vamos a utilizar
import carsModel from "../models/cars.js";

//SELECT
carsController.getCar = async (req, res) => {
    const cars = await carsModel.find();
    res.json(cars);
};

//INSERT
carsController.insertCars = async (req, res) => {
    //1. Solicito los datos a guardar
    const { 
        plate,
        model, 
        capacity, 
        driverId,
        status 
    } = req.body;

    //2. Llenar el modelo con estos datos
    const newCar = new carsModel({
        plate,
        model, 
        capacity, 
        driverId,
        status 
    });

    //3. Guardar el empleado en la base de datos
    await newCar.save();

    //4. Devuelvo la respuesta
    res.json({message: "Car saved"});
};

//DELETE
carsController.deleteCar = async (req, res) => {
    await carsModel.findByIdAndDelete(req.params.id);
    res.json({message:"Car deleted"})
}

//UPDATE
carsController.updateCar = async (req,res) => {

    //1. Solicito los datos a guardar
    const {         
        plate,
        model, 
        capacity, 
        driverId,
        status 
    } = req.body;

 
    //#2 Actualizo
    await carsModel.findByIdAndUpdate(
        req.params.id,
        {
            plate,
            model, 
            capacity, 
            driverId,
            status 
        },
        {new: true},        
    );
 
    res.json({message: "Car updated"})
};
 
export default carsController;
