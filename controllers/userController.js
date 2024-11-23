import { request, response } from "express"

const formularioLogin=(request, response)=>{
    response.render('auth/login', {
        autenticado: true //JSON
    })
}

const formularioRegister=(request, response)=>{
    response.render('auth/register', {

    })
}

const formularioPasswordRecovery=(request, response)=>{
    response.render('auth/passwordRecovery', {

    })
}


export {formularioLogin, formularioRegister, formularioPasswordRecovery}

