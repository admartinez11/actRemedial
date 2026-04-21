import mongoose,{ Schema, model} from "mongoose";

const packageSchema = new Schema({
    trackingNumber: { 
        type: Number
    },
    weight: { 
        type: String
    },
    dimensions: { 
        type: String
    },
    description: { 
        type: String
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients"       
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients"
    },
    status: { 
        type: Boolean,
    }
});

export default model("Packages", packageSchema);