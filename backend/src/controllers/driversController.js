import driverModel from "../models/drivers";

//Array de funciones
const driversController ={};

//SELECT
driversController.getDriver = async (req, res) => {
    try{
        const drivers = await driverModel.find();
        return res.status(200).json(drivers);
    }catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal serve error"})
    }
};

//UPDATE
driversController.updateDriver = async (req, res) => {
    try{
        let{
            name,
            lastName,
            licenseNumber,
            email,
            password,
            phone,
            address,
            isActive,
            isVerified,
            loginAttemps,
            timeOut,
        } = req.body;

        //Validaciones
        name = name?.trim()
        email = email?.trim()

        const driverUpdated = await driverModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                lastName,
                licenseNumber,
                email,
                password,
                phone,
                address,
                isActive,
                isVerified,
                loginAttemps,
                timeOut,
            },
            {new: true},
        );

        if(!driverUpdated){
            return res.status(404).json({message: "Driver not found"})
        }

        return res.status(200).json({message: "Driver updated"});

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

//ELIMINAR
driversController.deleteDriver = async (req, res) => {
    try{
        const deleteDriver = driverModel.findByIdAndDelete(req.params.id);

        //Si no se elimina es por que no encontró el id
        if(!deleteDriver){
            return res.status(404).json({message: "Driver not found"})
        }

        return req.status(200).json({message: "Driver deleted"});
    }catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal serve error"});
    }
};

export default driversController;