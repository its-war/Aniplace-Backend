const animeRouter = require('express').Router();
const listarAnimes = require('../controllers/anime/listarAnimes');
const listarAnime = require('../controllers/anime/listarAnime');
const getMenorAno = require('../controllers/anime/getMenorAno');

const getUserRank = require('../middlewares/usuario/getUserRank');

animeRouter.post('/listar', listarAnimes);
animeRouter.get('/listar/:id/:iduser', getUserRank, listarAnime);
animeRouter.get('/getMenorAno', getMenorAno);

module.exports = animeRouter;