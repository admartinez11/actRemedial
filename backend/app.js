import express from "express";
import cors from "cors";

import clientRoutes from "./src/routes/clients.js";
import registerClientRoutes from "./src/routes/registerClient.js";
import driverRoutes from "./src/routes/drivers.js";
import registerDriver from "./src/routes/registerDriver.js";
import packageRoutes from "./src/routes/packages.js";
import pathRoutes from "./src/routes/paths.js";
import shipmentRoutes from "./src/routes/shipments.js";
import loginRoutes from "./src/routes/login.js"
import cookieParser from "cookie-parser";

//creo una constante que guarde Express
const app = express();

app.use(
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
app.use ("/api/drivers", driverRoutes);
app.use ("/api/registerDriver", registerDriver);
app.use ("/api/packages", packageRoutes);
app.use ("/api/paths", pathRoutes);
app.use ("/api/shipments", shipmentRoutes);
app.use ("/api/login", loginRoutes);

export default app; 