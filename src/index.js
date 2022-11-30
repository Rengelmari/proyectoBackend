const express = require ('express');
/* const {Router} = express
const Contenedor = require('./contenedor/contenedorFs.js'); */
/* import express from 'express'; */
/* const rutaProductos = require('./routes/productos'); */
import { rutaProductos } from './routes/productos.js';
/* import { rutaCarrito } from './routes/carrito.js'; */

const app = express();
/* const router = Router() */

const PUERTO = process.env.PORT || 8080;
const publicRoot = './public';

//***** Hacemos la carpeta public visible
app.use(express.static(publicRoot));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', rutaProductos);
app.use('/api/carrito', rutaCarrito);

app.use((peticion, respuesta, next) => {
    if (!peticion.route) {
        respuesta.status(404).send({ error : -2, descripcion: `ruta ${peticion.url} no encontrada` });
    } else {
        next();
    }
})

const servidor = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));