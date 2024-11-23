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
        subject: 'Bienvenido/a al BienesRaices_230852',
        text: 'Ya casi puedes usar nuestra plataforma, sólo falta...',
        html: `<p>Hola, <span style="color: violet"> ${name}</span>, <br>
        Bienvenido a la plataforma de BienesRaíces, el sitio seguro donde podrás buscar, comprar y ofertar propiedades a través de Internet.
        <br>
        <p>Ya sólo necesitamos que confirmes la cuenta que creaste, dando click a la siguiente liga: <a href="${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}">Confirmar cuenta</a></p>
        <br>
        <p>Si tu no has creado la cuenta, ignora este mensaje.</p>`
    })
}

export {emailAfterRegister}