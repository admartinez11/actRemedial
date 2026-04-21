import{ Schema, model} from "mongoose";

const driverSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    lastName: { 
        type: String,
        required: true 
    },
    licenseNumber: { 
        type: String, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    isActive: { 
        type: Boolean,
    },
    isVerified: { 
        type: Boolean,
    },
    loginAttempts: {
        type: Number,
    },
    timeOut: {
        type: Date,
    }
});

export default model("Drivers", driverSchema);