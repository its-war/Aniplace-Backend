const animeRouter = require('express').Router();

const cadastrarAnime = require('../controllers/anime/cadastrarAnime');
const listarAnime = require('../controllers/anime/listarAnime');
const addGeneros = require('../controllers/anime/addGeneros');
const addTemporada = require('../controllers/anime/addTemporada');
const addFansub = require('../controllers/anime/addFansub');

animeRouter.post('/cadastrarAnime', cadastrarAnime, addGeneros);
animeRouter.post('/listarAnime', listarAnime);
animeRouter.post('/addTemporada', addTemporada);
animeRouter.post('/addFansub', addFansub);

module.exports = animeRouter;