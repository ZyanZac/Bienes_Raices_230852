import { request, response } from "express"

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


const registrar=(req, res)=>{
    console.log('Registrando usuario.');
}


export {formularioLogin, formularioRegister, formularioPasswordRecovery, registrar}

