//ECMA Script 6
//CommonJS
//Librerías globales del proyecto
import express from 'express';
import csrf from 'csurf'
import cookieParser from 'cookie-parser';
//Librerías específicas del proyecto
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './db/config.js';
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

//const express=require('express'); //Declaración que permitirá entrar al protocolo http y leer páginas. Importar la librería para crear un servidor web
//Instanciar nuestra aplicación web
const app=express();



//Habilitar la conexión de lectura desde formularios.
app.use(express.urlencoded({encoded: true}))


//Habilitar Cookie Parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie: true}))



//Habilitar Pug
app.set('view engine', 'pug') //Quien va a manejar las listas
app.set('views', './views') //Definir dónde va a estar la carpeta de vistas


//Definir la carpeta pública de recursos estáticos (assets). Va a poder leer todo lo que se encuentra aquí, mas no escribir.
app.use(express.static('./public'));


//Configuramos nuestro servidor web 
const port= process.env.BACKEND_PORT;
app.listen(port, ()=>{
    console.log(`La aplicación ha iniciado en el puerto: ${port}`); //Se levanta el servidor
});


//Conexión a la base de datos
//Programación asíncrona se hace simultáneamente. La conexión la hace sqlite.
try{
    //Verificación de las credenciales del usuario
    await db.authenticate();
    //Sincronización las tablas con los modelos
    db.sync();
    console.log('Conexión Correcta a la Base de Datos');
} catch(error) {
    console.log(error);
}



//Probamos las rutas para poder presentar mensajes al usuario a través del navegador
/*app.get("/", function(req, res){
    res.send("Hola Mundo desde Node, a través del Navegador.");
});

app.get("/QuienSoy", function(req, res){
    res.json({"estudiante": "Zyanya Ahuachtli Zacatenco Pedroza",
        "carrera": "TI DSM",
        "grado": "4°",
        "grupo": "B",
        "asignatura": "Aplicaciones Web Orientada a Servicios (AWOS)"
    });
});*/


//Routing - Enrutamiento
app.use('/', generalRoutes);
//app.use('/usuario/', userRoutes);
app.use('/auth/', userRoutes);

