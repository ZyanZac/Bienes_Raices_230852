import { request, response } from "express"
import User from '../models/User.js'


const formularioLogin=(request, response)=>{
    response.render('auth/login', {
        //autenticado: true, //JSON
        page: "Ingresa a la plataforma"
    })
}

const formularioRegister=(request, response)=>{
    response.render('auth/register', {
        page: "Crea una nueva cuenta"
    })
}

const formularioPasswordRecovery=(request, response)=>{
    response.render('auth/passwordRecovery', {
        page: "Recupera tu contraseña"
    })
}


const createNewUser=async(request, response)=>{
    console.log('Registrando usuario.');
    console.log(request.body);
    //Registrando los datos en la base de datos
    const newUser=await User.create({
        name: request.body.nombre_usuario, 
        email: request.body.correo,
        password: request.body.pass_usuario,
    });
    response.json(newUser);
}




export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser}

