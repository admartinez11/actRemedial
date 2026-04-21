import mongoose,{ Schema, model} from "mongoose";

const shipmentSchema = new Schema({
    packageId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Packages"       
    },
    pathId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paths"       
    },
    driverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drivers"       
    },
    carId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cars"       
    },
    departureDate: { 
        type: Date
    },
    deliveryDate: { 
        type: Date
    },
    status: { 
        type: Boolean,
    }
});

export default model("Shipments", shipmentSchema);