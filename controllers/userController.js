import { request, response } from "express" 
import { check, validationResult } from 'express-validator' //check para checar, validator para verificar la validación
import User from '../models/User.js'
import { generateID } from '../helpers/tokens.js'
import { removeTicks } from "sequelize/lib/utils"
import { emailAfterRegister } from '../helpers/emails.js'
import { where } from "sequelize"


const formularioLogin=(request, response)=>{
    response.render('auth/login', {
        //autenticado: true, //JSON
        page: "Ingresa a la plataforma"
    })
}

const formularioRegister=(request, response)=>{
    response.render('auth/register', {
        page: "Crea una nueva cuenta",
        csrfToken: request.csrfToken()
    })
}

const formularioPasswordRecovery=(request, response)=>{
    response.render('auth/passwordRecovery', {
        page: "Recupera tu contraseña",
        csrfToken: request.csrfToken()
    })
}



const createNewUser=async(request, response)=>{
    const mayorEdad = (dateBirth) => {
        const today=new Date();
        const birth=new Date(dateBirth);
        const age=today.getFullYear()-birth.getFullYear();
        const month=today.getMonth()-birth.getMonth();
    
        if(month < 0 || (month === 0 && today.getDate() < birth.getDate())){
            age--;
        }
        return age>=18;
    }
    
    //Validación
    await check('nombre_usuario').notEmpty().withMessage('El nombre es un campo obligatorio.').run(request);
    await check('correo').notEmpty().withMessage('El correo electrónico es un campo obligatorio').isEmail().withMessage('El correo electrónico no tiene el formato de usuario@dominio.extension').run(request);
    await check('pass_usuario').notEmpty().withMessage('La contraseña es un campo obligatorio.').isLength({ min:8 }).withMessage('La contraseña debe ser de al menos 8 carácteres.').run(request);
    await check('pass2_usuario').notEmpty().withMessage('La confirmación de contraseña es un campo obligatorio').equals(request.body.pass_usuario).withMessage('Las contraseñas deben ser iguales.').run(request);
    await check('date_birth').notEmpty().withMessage('La fecha de nacimiento es un campo obligatorio').custom((value)=>{
        if(!mayorEdad(value)){
            throw new Error('Debes ser mayor de edad para poder registrarte.');
        }
        return true;
    });


    let result=validationResult(request);

    //return response.json(result.array())
    //Verificar que el resultado esté vacío.
    if(!result.isEmpty()) {
        //Errores
        return response.render('auth/register', {
            page: 'Error al intentar crear la cuenta',
            csrfToken: request.csrfToken(),
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
    const {nombre_usuario:name, date_birth:date, correo:email, pass_usuario:password} = request.body

    //Verificarque el usuario no existe previamente en la base de datos
    const existingUser=await User.findOne({where: {email}})

    console.log(existingUser);

    if(existingUser){
        return response.render("auth/register", {
            page: 'Error al intentar crear la cuenta de usuario.',
            csrfToken: request.csrfToken(),
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
        date: request.body.date_birth,
        email: request.body.correo,
        password: request.body.pass_usuario,
        token: generateID()
    });

    
    //Enviar el correo de confirmación
    emailAfterRegister({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token
    })


    //Mostrar mensaje de confirmación 
    response.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: `Hemos enviado un correo de confirmación a: ${email} para la confirmación de la cuenta.`
    })


    //response.json(newUser);
    //return;
}


const confirm = async (request, response) => {
    //Validar token - si existe
    //Confirmar cuenta
    //Enviar mensje de confirmación de cuenta
    const {token} = request.params 
    console.log(`Intentando confirmar la cuenta con el token: ${token}`)

    //Verificar si el token es válido
    const user = await User.findOne({where: {token}})
    console.log(User)

    if(!user){
        return response.render('auth/confirmAccount', {
            page: 'Error al confirmar la cuenta.',
            message: `Hubo un error al confirmar la cuenta, inténtalo de nuevo.`,
            error: true
        })
    }

    //Confirmar la cuenta
    user.token=null;
    user.confirmado=true;
    await user.save();


    return response.render('auth/confirmAccount', {
            page: 'Cuenta confirmada.',
            message: `La cuenta se confirmó correctamente. Inicia sesión para acceder a la cuenta.`,
        })


}


const passwordReset=async(request, response)=>{
    //Validación

    console.log("Validando los datos para la recuperación de la contraseña.")

    await check('correo').notEmpty().withMessage('El correo electrónico es un campo obligatorio.').isEmail().withMessage('El correo electrónico no tiene el formato de usuario@dominio.extension').run(request);


    let result=validationResult(request);

    //return response.json(result.array())
    //Verificar que el resultado esté vacío.
    if(!result.isEmpty()) {
        //Errores
        return response.render('auth/passwordRecovery', {
            page: 'Error al intentar crear una nueva contraseña.',
            csrfToken: request.csrfToken(),
            errors: result.array()
        })
    } 

    //Desestructuración de los parámetros del request
    const {correo:email} = request.body

    //Verificarque el usuario no existe previamente en la base de datos
    const existingUser=await User.findOne({where: {email}})

    console.log(existingUser);

    if(existingUser){
        return response.render("auth/passwordRecovery", {
            page: 'El usuario vinculado a ese correo no existe.',
            csrfToken: request.csrfToken(),
            errors:[{msg: `Por favor, verifica los datos e inténtalo de nuevo.`}],
        })
    }


    //response.json(resultado.array());

    //Registrando los datos en la base de datos
    const newUser=await User.create({ //await que espere
        name: request.body.nombre_usuario, 
        date: request.body.date_birth,
        email: request.body.correo,
        password: request.body.pass_usuario,
        token: generateID()
    });

    
    //Enviar el correo de confirmación
    emailAfterRegister({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token
    })


    //Mostrar mensaje de confirmación 
    response.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: `Hemos enviado un correo de confirmación a: ${email} para la confirmación de la cuenta.`
    })

}





export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser, confirm, passwordReset}





