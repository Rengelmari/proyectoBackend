import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs';
const rutaProductos = express.Router();
/* const Contenedor = require('./contenedor/contenedorFs.js'); */


const productos = new Contenedor('./src/db/productos.txt');

const privilegio = (peticion, respuesta, next) => {
  const administrador = peticion.headers.administrador;
  if (administrador === 'true') {
    next();
  } else {
    respuesta.status(401).send({ error : -1, descripcion: `ruta ${peticion.url} no autorizada` });
  }
};

//Endpoints***

rutaProductos.get('/', async (peticion, respuesta) => {
    const listaProductos = await productos.getAll();
    respuesta.json(listaProductos);
});

rutaProductos.get('/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    const producto = productos.getById(id);
    if (producto) {
        respuesta.json(producto);
    } else {
        respuesta.status(404);
        respuesta.json({ error : 'producto no encontrado' });
    }
});

rutaProductos.post('/', privilegio, async (peticion, respuesta) => {
    const producto = peticion.body;
    await productos.save(producto);
    
});

rutaProductos.put('/:id', privilegio, async (peticion, respuesta) => {
    const idProducto = parseInt(peticion.params.id);
    const producto = peticion.body;
    await productos.update(idProducto, producto);
    respuesta.json(producto);
});

rutaProductos.delete('/:id', privilegio, async (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    const producto = await productos.deleteById(id);
    if (producto) {
      respuesta.json(producto);
  } else {
      respuesta.status(404);
      respuesta.json({ error : 'producto no encontrado' });
  }
});

export { rutaProductos };