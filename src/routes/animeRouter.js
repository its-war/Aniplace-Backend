const animeRouter = require('express').Router();
const listarAnimes = require('../controllers/anime/listarAnimes');
const listarAnime = require('../controllers/anime/listarAnime');

animeRouter.get('/listar', listarAnimes);
animeRouter.get('/listar/:id', listarAnime);

module.exports = animeRouter;