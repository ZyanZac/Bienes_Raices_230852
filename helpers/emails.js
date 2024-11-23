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
        html: `<h1><span style="color: #9D8DF1">¡Estás a un paso de poder acceder a tu cuenta en</span> <span style="color: #573280"> Bienes Raíces!</span></h1>
        <img src="https://blog.cliengo.com/wp-content/uploads/2023/01/BLOG_Imagenes-destacadas-https___blog.cliengo.com_que-es-bienes-raices_.png" width="100%">
        <div style="background-color: #B8CDF8; width:100%; padding:20px;>

            
            <p style="font-family: Arial, Helvetica, sans-serif;">Bienvenido, <b><span style="color: #573280"> ${name}</span></b>. Estamos contentos de que haya decidio unirse a nuestra página de Bienes Raíces, el mejor sitio donde podrás buscar, comprar y ofertar propiedades a través de Internet.
            <br>
            <center><img src="https://img.freepik.com/vector-premium/conjunto-bienes-raices_18591-75350.jpg"></center>
            <p style="font-family: Arial, Helvetica, sans-serif;">Haz click en el siguiente enlace para poder acceder a tu cuenta y poder comprar y/o vender propiedades:</p><br>
            <center><h1><a href="${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}">Confirmar cuenta</a></h1></center>
            <br>
            <p style="font-family: Arial, Helvetica, sans-serif;">Si tu no has creado la cuenta, ignora este mensaje.</p><br>
        </div>
        <h2>Atentamente:</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;"><img src="https://img.freepik.com/fotos-premium/logotipo-bienes-raices-casa-fondo-blanco-ilustracion-vectorial_1015980-641956.jpg?w=1060" width="5%"><span style="color: #9D8DF1">Equipo de Bienes Raíces</span></h3>`
    })
}

export {emailAfterRegister}