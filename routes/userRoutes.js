import express from 'express';

const router=express.Router();

import {formularioLogin, authentic, formularioRegister, formularioPasswordRecovery, createNewUser, confirm, passwordReset, updatePassword, verifyTokenPasswordChange} from '../controllers/userController.js';



//GET - Se utiliza para la lectura de datos e información del servidor al cliente.
//EndPoints - Son las rutas para acceder a las secciones o funciones de nuestra aplicación web, se define el flujo de la aplicación y tiene dos componentes
//2 componentes de una petición ruta (a dónde voy), función callback(qué hago)
//":" en una ruta definen de manera posicional los parámetros de entrada
router.get("/busquedaPorID/:id", function(request, response){//Todas las peticiones de una aplicación deben venir con dos componentes: ruta y función callback. La ruta es definir hacia dónde irá. Pídeme y te respondo. Son las instrucciones específicas para que vayan a tal lado. El next es opcional, lo que se hará después. el req es obligatorio
    response.send(`Se está solicitando buscar al usuario con el ID ${request.params.id}`); //params parámetros
});



//POST - Se utiliza para el envío de datos e información del cliente al servidor
//La aplicación es newUser
router.post("/newUser", createNewUser)



//PUT - Se utiliza para la actualización total de información del cliente al servidor
router.put("/replaceUserByEmail/:name/:email/:password", function(a, b){
    b.send(`Se ha solicitado el reemplazo de toda la información del usuario: ${a.params.name}, con correo: ${a.params.email} y contraseña: ${a.params.password}`);
});


//PATCH - Se utiliza para la actualización parcial
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm", function(request, response){
    const {email, newPassword, newPasswordConfirm}=request.params //Desestructuración de un objeto

    if(newPassword===newPasswordConfirm){
        response.send(`Se ha solicitado la actualización de la constraseña del ususario con correo: ${email}. Se aceptan los cambios, ya que la constraseña y confirmación de la contraseña son la misma.`);
        console.log(newPassword);
        console.log(newPasswordConfirm);
    } else {
        response.send(`Se ha solicitado la actualización de la constraseña del ususario con correo: ${email}. Se rechazan los cambios, ya que la constraseña y confirmación de la contraseña no coinciden.`);
        console.log(newPassword);
        console.log(newPasswordConfirm);
    }
});


//DELETE
router.delete("/deleteUser/:email", function(request, response){
    response.send(`Se ha solicitado la eliminación del usuario al correo: ${request.params.email}`);
});






/*router.get("/login", function(request, response){
    response.render("auth/login", {
        autenticado: true //JSON
    })
})*/


router.get("/login", formularioLogin) //Middelware, quien guía, asigna la tarea a alguien más
router.post("/login", authentic)

router.get("/createAccount", formularioRegister)
router.post("/createAccount", createNewUser)

router.get("/passwordRecovery", formularioPasswordRecovery)
router.post("/passwordRecovery", passwordReset)

router.get("/confirmAccount/:token", confirm) //("frontend", backend)

//Actualizar contraseña
router.get("/passwordRecovery/:token", verifyTokenPasswordChange)
router.post("/passwordRecovery/:token", updatePassword) 





export default router;