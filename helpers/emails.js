import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { text } from 'express'

dotenv.config({path: '.env'})

const emailAfterRegister = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //console.log(data)
    const {email, name, token} = newUserData

    //Enviar el email
    await transport.sendMail({
        from: 'bienes_raices_230852.com',
        to: email,
        subject: 'Confirmación de email',
        text: 'Para poder acceder a la plataforma necesitarás...',
        html: `
        <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Hola,  <strong><span style="color: #573280"> ${name}</span></strong>.<h1>
        <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><span style="color: #9D8DF1">¡Estás a un paso de poder acceder a tu cuenta en</span> <span style="color: #573280"> Bienes Raíces!</span></h1>
        <img src="https://blog.cliengo.com/wp-content/uploads/2023/01/BLOG_Imagenes-destacadas-https___blog.cliengo.com_que-es-bienes-raices_.png" width="100%">
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"> Estamos contentos de que haya decidio unirse a nuestra página de Bienes Raíces, el mejor sitio donde podrás buscar, comprar y ofertar propiedades a través de Internet.
            <br>
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Haz click en el siguiente enlace para poder acceder a tu cuenta y poder comprar y/o vender propiedades:</p><br>
            <center><h1><a href="${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}" style="text-decoration: none">Confirmar cuenta</a></h1></center>
            <br>
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Si tu no has creado la cuenta, por favor ignora este mensaje.</p><br>
        
        <h2>Atentamente:</h2>
        <h3 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"><img src="https://img.freepik.com/fotos-premium/logotipo-bienes-raices-casa-fondo-blanco-ilustracion-vectorial_1015980-641956.jpg?w=1060" width="5%"><span style="color: #9D8DF1">Equipo de Bienes Raíces</span></h3>`
    })
}

const emailChangePassword = async ( userData ) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const {email, name, token} = userData

    //Enviar el email
    await transport.sendMail({
        from: 'bienesraices-matricula.com',
        to: email,
        subject: 'Solicitud de actualización de constraseña en Bienes Raíces',
        text: `Por favor, actualiza tu contraseña para ingresar a la plataforma`,
        html: `<p>Hola, <span style="color: #573280"> ${name}</span>, <br>
        Haz reportado el olvido o pérdida de tu contraseña para acceder a tu cuenta de Bienes Raíces.
        <br>
        <p> Por lo que necesitamos que ingreses a la siguiente liga: <a href="${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/auth/passwordRecovery/${token}">Actualizar Contraseña</a></p>
        <br>
        <p>Si no solicitaste el cambio de contraseña, ignora este mensaje.</p>`
    })

}



export {emailAfterRegister, emailChangePassword}