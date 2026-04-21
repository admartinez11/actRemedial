import express from "express";

import clientRoutes from "./src/routes/clients.js";
import registerClientRoutes from "./src/routes/registerClient.js";


//creo una constante que guarde Express
const app = express();

app .use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5173"],
        //permitir el envío de cookies y credenciales  
        credentials: true,
    })
);

app.use(cookieParser());

//que acepte los json desde postman
app.use(express.json());

app.use ("/api/clients", clientRoutes);
app.use ("/api/registerClient", registerClientRoutes);


export default app; 