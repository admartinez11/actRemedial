import nodemailer from "nodemailer"; //enviar correos
import crypto from "crypto"; //generar codigo aleatorio
import jsonwebtoken  from "jsonwebtoken"; //token
import bcryptjs from "bcryptjs"; //encriptar

import driverModel from "../models/drivers.js";

import { config } from "../../config.js";

//array de funciones
const registerDriverController = {};

registerDriverController.register = async (req, res) => {
    //#1 Solicitar datos
    const{
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
        timeOut
    } = req.body;

    try{
        //validar que el correo no exista
        const existingDriver = await driverModel.findOne({ email });
        if(existingDriver){
            return res.status(400).json({ message: "Driver already exists" });
        }

        //encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //generar codigo aleatorio
        const randomNumber = crypto.randomBytes(3).toString("hex")

        //Guardamos en un token la info
        const token = jsonwebtoken.sign(
            //#1 q vamos a guardar
            {
                name,
                lastName,
                licenseNumber,
                email,
                password: passwordHashed,
                phone,
                address,
                isActive,
                isVerified,
                loginAttemps,
                timeOut
            },
            //#2 secret key 
            config.JWT.SECRET,
            //#3 cuando expira
            { expiresIn: "15min"}
        );



        res.cookie("RegistrationCookie", token, {maxAge: 15 * 60 * 1000});

        //enviamos el codigo aleatorio por correo electrónico
        //#1 transporter = quien envia el correo
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        //2 mailOption = quien lo recibe y como
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta, utiliza este código: " + randomNumber + " expira en 15min"
        }

        //#3 enviar el correo
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }
            return res.status(200).json({message: "Email sent"})
        })

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal serve error"})
    }
};

//verificar el código que acabamos de enviar
registerDriverController.verifyCode = async (req, res) => {
    try{
        //solicitamos el código
        const {verificationCodeRequest} = req.body;

        //obtener el token de las cookies
        const token = req.cookies.RegistrationCookie;

        //extraer toda la info del token
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
        const {
            randomNumber: storedCode, 
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
            timeOut
        } = decoded;

        //comparar lo que el usuario escribió con el código del token
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"}) 
        }

        //si todo está bien, y el usuario escribe el código, lo registramos en la BD
        const NewClient = new clientModel({
            name,
            lastName,
            licenseNumber,
            email,
            password,
            phone,
            address,
            isActive,
            isVerified: true,
            loginAttemps,
            timeOut
        });

        await NewClient.save();

        res.clearCookie("registrationCookie");

        return res.status(200).json({message: "Client registered"})

    } catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

export default registerClientController;  

