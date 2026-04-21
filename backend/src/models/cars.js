import{ Schema, model} from "mongoose";

const carSchema = new Schema({
    plate: { 
        type: String
    },
    model: { 
        type: String
    },
    capacity: { 
        type: String
    },
    driverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drivers"       
    },
    status: { 
        type: Boolean,
    }
});

export default model("Cars", carSchema);