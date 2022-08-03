const animeRouter = require('express').Router();
const listarAnimes = require('../controllers/anime/listarAnimes');
const listarAnime = require('../controllers/anime/listarAnime');

const getUserRank = require('../middlewares/usuario/getUserRank');

animeRouter.get('/listar', listarAnimes);
animeRouter.get('/listar/:id/:iduser', getUserRank, listarAnime);

module.exports = animeRouter;