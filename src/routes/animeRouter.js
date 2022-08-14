const animeRouter = require('express').Router();
const listarAnimes = require('../controllers/anime/listarAnimes');
const listarAnime = require('../controllers/anime/listarAnime');
const getMenorAno = require('../controllers/anime/getMenorAno');
const animesMaisAcessados = require('../controllers/anime/animesMaisAcessados');
const fastSearch = require('../controllers/anime/fastSearch');

const getUserRank = require('../middlewares/usuario/getUserRank');

animeRouter.post('/listar', listarAnimes);
animeRouter.get('/listar/:id/:iduser', getUserRank, listarAnime);
animeRouter.get('/getMenorAno', getMenorAno);
animeRouter.get('/animesMaisAcessados', animesMaisAcessados);
animeRouter.get('/fastSearch/:value', fastSearch);

module.exports = animeRouter;