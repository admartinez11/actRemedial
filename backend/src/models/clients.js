import{ Schema, model} from "mongoose";

const clientSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    lastName: { 
        type: String,
        required: true 
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
    address: { 
        type: String,
        required: true 
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

export default model("Clients", clientSchema);