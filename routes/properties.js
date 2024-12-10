import express from 'express';

const router = express.Router();

router.get('/myProperties', (request, response) => {
    if (request.cookies && request.cookies._token) {
        response.render('properties/myProperties'); // Asegúrate de tener esta vista creada
    } else {
        response.redirect('/auth/login');
    }
});

export default router;