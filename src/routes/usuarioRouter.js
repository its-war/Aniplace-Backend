const usuarioRouter = require('express').Router();

const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario');
const ativarUsuario = require('../controllers/usuario/ativarUsuario');

usuarioRouter.post('/cadastrarUsuario', cadastrarUsuario);
usuarioRouter.put('/ativar/', ativarUsuario);

module.exports = usuarioRouter;