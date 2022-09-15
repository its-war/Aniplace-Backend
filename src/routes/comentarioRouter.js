const comentarioRouter = require('express').Router();

const newComentario = require('../controllers/comentario/newComentario');
const curtirComentario = require('../controllers/comentario/curtirComentario');
const descurtirComentario = require('../controllers/comentario/descurtirComentario');

comentarioRouter.post('/newComentario', newComentario);
comentarioRouter.get('/curtirComentario/:id', curtirComentario);
comentarioRouter.get('/descurtirComentario/:id', descurtirComentario);

module.exports = comentarioRouter;