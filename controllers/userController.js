import { request, response } from "express" 
import { check, validationResult } from 'express-validator' //check para checar, validator para verificar la validación
import User from '../models/User.js'
import { generateID } from '../helpers/tokens.js'
import { removeTicks } from "sequelize/lib/utils"


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

    //Validación
    await check('nombre_usuario').notEmpty().withMessage('El nombre es un campo obligatorio.').run(request);
    await check('correo').notEmpty().withMessage('El correo electrónico es un campo obligatorio').isEmail().withMessage('El correo electrónico no tiene el formato de usuario@dominio.extension').run(request);
    await check('pass_usuario').notEmpty().withMessage('La contraseña es un campo obligatorio.').isLength({ min:8 }).withMessage('La contraseña debe ser de al menos 8 carácteres.').run(request);
    await check('pass2_usuario').notEmpty().withMessage('La confirmación de contraseña es un campo obligatorio').equals(request.body.pass_usuario).withMessage('Las contraseñas deben ser iguales.').run(request);


    let result=validationResult(request);

    //return response.json(result.array())
    //Verificar que el resultado esté vacío.
    if(!result.isEmpty()) {
        //Errores
        return response.render('auth/register', {
            page: 'Error al intentar crear la cuenta',
            errors: result.array(),
            user:{
                name: request.body.nombre_usuario,
                email: request.email
            }
        })
    } /*else {
        console.log("Registrando a nuevo usuario");
        console.log(request.body);
    }*/

    //Desestructuración de los parámetros del request
    const {nombre_usuario:name, correo:email, pass_usuario:password} = request.body

    //Verificarque el usuario no existe previamente en la base de datos
    const existingUser=await User.findOne({where: {email}})

    console.log(existingUser);

    if(existingUser){
        return response.render("auth/register", {
            page: 'Error al intentar crear la cuenta de usuario.',
            errors:[{msg: `El usuario ${email} ya se encuentra registrado.`}],
            user:{
                name:name
            }
        })
    }

    console.log("Registrando a nuevo usuario");
    console.log(request.body);


    //response.json(resultado.array());

    //Registrando los datos en la base de datos
    const newUser=await User.create({ //await que espere
        name: request.body.nombre_usuario, 
        email: request.body.correo,
        password: request.body.pass_usuario,
        token: generateID()
    });

    //Mostrar mensaje de confirmación 
    response.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: `Hemos enviado un correo de confirmación a: ${email} para la confirmación de la cuenta.`
    })


    //response.json(newUser);
    //return;
}


export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser}





