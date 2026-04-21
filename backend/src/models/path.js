import{ Schema, model} from "mongoose";

const pathSchema = new Schema({
    origin: { 
        type: String
    },
    destination: { 
        type: String
    },
    distance: { 
        type: String
    },
    estimatedTime: { 
        type: Date
    }
});


export default model("Paths", pathSchema);