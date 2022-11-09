const postagemRouter = require('express').Router();

const newPost = require('../controllers/postagem/newPost');
const getFeed = require('../controllers/postagem/getFeed');
const curtirPost = require('../controllers/postagem/curtirPost');
const getCurtidas = require('../controllers/postagem/getCurtidas');
const descurtirPost = require('../controllers/postagem/descurtirPost');
const deletePost = require('../controllers/postagem/deletePost');
const getFeedUser = require('../controllers/postagem/getFeedUser');

const upload = require('../middlewares/postagem/upload');

postagemRouter.post('/newPost', upload.single('imagem'), newPost);
postagemRouter.get('/getFeed/:pagina', getFeed);
postagemRouter.get('/curtirPost/:id', curtirPost);
postagemRouter.get('/descurtirPost/:id', descurtirPost);
postagemRouter.get('/getCurtidas/:id', getCurtidas);
postagemRouter.get('/getPost/:id');
postagemRouter.put('/deletePost', deletePost);
postagemRouter.get('/getFeedUser/:pagina', getFeedUser);

module.exports = postagemRouter;