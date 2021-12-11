require('dotenv').config();

const express= require('express');
const { registrarControladores } = require('./controllers');
const { conectarAMongoDB, subscribirCerrar } = require('./db/db');

const app = express();
const port = process.env.PORT || 9000;

//Configuramos middleware para express
app.use(express.json()); //procesar peticiones con cuerpo json
app.use(express.urlencoded()); //procesar parametros codificados en la url

//Establecer conexión con MongoDB
conectarAMongoDB();

//Registramos la configuración de las funciones controladoras
registrarControladores(app);

//Configuramos watchers para cerrar la conexión
//cuando ser termine de ejecutar nuestro backend.
subscribirCerrar();

app.listen(port, () => {
    console.log(`Backend esta corriendo en el puerto: ${port}`);
});
