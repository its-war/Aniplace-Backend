const comentarioRouter = require('express').Router();

const newComentario = require('../controllers/comentario/newComentario');

comentarioRouter.post('/newComentario', newComentario);

module.exports = comentarioRouter;