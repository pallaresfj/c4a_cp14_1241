const express = require('express');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authutils');

const router = express.Router();

router.post('/new', async (request, response) => {
    try {
        console.log("Creando usuario nuevo...");
        const usr = new Usuario(request.body);
        await usr.save();
        response.json({ mensaje:'Usuario guardado con exito.', usuario: usr.login });
    }catch(e) {
        console.log("Error creando usuario nuevo: ");
        console.log(e);
        response.status(500).send("Error al crear usuario nuevo.");
    }   
    
});

//{ username: xxxxxx, password: xxxxxxx }
router.post('/login', async (request, response) => {
    try {
        const { refreshToken, accessToken } = await validarUsuario(request.body);
        response.json( { token: accessToken });

    }catch (e) {
        console.log('Error al intentar autenticar el usuario.');
        console.log(e);
        response.status(401).send('Nombre de usuario o contraseña incorrecta.');
    }
});

module.exports = router;