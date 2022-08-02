const destaqueRouter = require('express').Router();
const listarDestaques = require('../controllers/destaque/listarDestaques');

destaqueRouter.get('/listar', listarDestaques);

module.exports = destaqueRouter;