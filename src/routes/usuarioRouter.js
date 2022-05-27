const usuarioRouter = require('express').Router();

const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario');
const ativarUsuario = require('../controllers/usuario/ativarUsuario');

usuarioRouter.post('/cadastrarUsuario', cadastrarUsuario);
usuarioRouter.get('/ativar/:chave', ativarUsuario);

module.exports = usuarioRouter;