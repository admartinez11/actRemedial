import clientModel from "../models/clients.js";

import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import {config } from "../../config.js";
import clientController from "./clientsController.js";

//array de funciones
const loginClientsController = {};

loginClientsController.login = async (req, res) => {
       //#1 solicito los datos
    const {email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo inválido" });
    }
 

    try{
        //#1 buscar el correo en la bd
        const clientFound = await clientModel.findOne({ email });

        //Si no existe el correo en la bd
        if(!clientFound){
            return res.status(404).json({message: "Client not found"});
        }

        //verificar si el usuario está bloqueado
        if(clientFound.timeOut && clientFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"});
        }

        //validar la contraseña
        const isMatch = await bcrypt.compare(password, clientFound.password);
        
        if(!isMatch){
            clientFound.loginAttemps = (clientFound.loginAttemps || 0) + 1;

            //si llega a 5 intentos fallidos se bloquea la cuenta
            if (clientFound.loginAttemps >= 5){
                clientFound.timeOut = Date.now() + 5 * 60 * 1000;
                clientFound.loginAttemps = 0;

                await clientFound.save();

                return res.status(403).json({message: "Cuenta bloqueada por multiples intentos fallidos"})
            }

            await clientFound.save();
            
            return res.status(403).json({message: "Credenciales incorrectas"})
        }

        //Resetear intentos si login correcto
        clientFound.loginAttemps = 0;
        clientFound.timeOut = null;

        //generar el token
        const token = jsonwebtoken.sign(
            //#1 q datosw vamos a guardar
            {id: clientFound._id, userType: "Client"},
            //#2 secret key
            config.JWT.SECRET,
            //#3 cuando expira
            {expiresIn: "30d"}
        );

        //el token lo guardamos en una cookie
        res.cookie("authCookie", token)

        return res.status(200).json({ message: "Login exitoso"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal serve error"})
    }
};

export default loginClientsController;
