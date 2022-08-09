const generoRouter = require('express').Router();

const listarGeneros = require('../controllers/genero/listarGeneros');

generoRouter.get('/listar', listarGeneros);

module.exports = generoRouter;