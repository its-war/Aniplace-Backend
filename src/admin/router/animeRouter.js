const animeRouter = require('express').Router();

const cadastrarAnime = require('../controllers/anime/cadastrarAnime');
const listarAnime = require('../controllers/anime/listarAnime');
const fistTemporada = require('../controllers/anime/fistTemporada');
const addFansub = require('../controllers/anime/addFansub');

animeRouter.post('/cadastrarAnime', cadastrarAnime, fistTemporada);
animeRouter.post('/listarAnime', listarAnime);
animeRouter.post('/addFansub', addFansub);

module.exports = animeRouter;