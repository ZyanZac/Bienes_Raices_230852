import express from 'express';


const router=express.Router()

//home
router.get("/", function(req, res){
    res.send("Hola Mundo desde Node, a través del Navegador.");
});


/*router.get("/login", function(req, res){
    res.render('auth/login');
});*/


//QuienSoy
router.get("/QuienSoy", function(req, res){
    res.json({"estudiante": "Zyanya Ahuachtli Zacatenco Pedroza",
        "carrera": "TI DSM",
        "grado": "4°",
        "grupo": "B",
        "asignatura": "Aplicaciones Web Orientada a Servicios (AWOS)"
    });
});

export default router; //Esta palabra reservada de JS permite exportar los elementos definidos y utilizarlos en otros archivos del mismo sitio.

