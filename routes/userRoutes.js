import express from 'express';

const router=express.Router();


//GET
router.get("/busquedaPorID/:id", function(request, response){//Todas las peticiones de una aplicación deben venir con dos componentes: ruta y función callback. La ruta es definir hacia dónde irá. Pídeme y te respondo. Son las instrucciones específicas para que vayan a tal lado. El next es opcional, lo que se hará después. el req es obligatorio
    response.send(`Se está solicitando buscar al usuario con el ID ${request.params.id}`); //params parámetros
});



//POST


//PUT


//PATCH


//DELETE







export default router;