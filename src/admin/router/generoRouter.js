const generoRouter = require('express').Router();

const cadastrarGenero = require('../controllers/genero/cadastrarGenero');
const deleteGenero = require('../controllers/genero/deleteGenero');
const editarGenero = require('../controllers/genero/editarGenero');
const listarGenero = require('../controllers/genero/listarGenero');
const listarGeneros = require('../controllers/genero/listarGeneros');

generoRouter.post('/cadastrar', cadastrarGenero);
generoRouter.post('/delete', deleteGenero);
generoRouter.post('/editar', editarGenero);
generoRouter.post('/listar', listarGenero);
generoRouter.get('/listarGeneros', listarGeneros);

module.exports = generoRouter;