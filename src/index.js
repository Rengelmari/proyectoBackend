const express = require ('express');
const {Router} = express
const Contenedor = require('./contenedor/contenedorFs');

const app = express();
const router = Router()

const PUERTO = process.env.PORT || 8080;
const publicRoot = './public';

//***** Hacemos la carpeta public visible
app.use(express.static(publicRoot));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const servidor = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));