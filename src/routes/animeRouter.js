const animeRouter = require('express').Router();
const listarAnimes = require('../controllers/anime/listarAnimes');
const listarAnime = require('../controllers/anime/listarAnime');
const getMenorAno = require('../controllers/anime/getMenorAno');
const animesMaisAcessados = require('../controllers/anime/animesMaisAcessados');
const fastSearch = require('../controllers/anime/fastSearch');

const getUserRank = require('../middlewares/usuario/getUserRank');
const checkToken = require('../middlewares/login/checkToken');

animeRouter.post('/listar', checkToken, listarAnimes);
animeRouter.get('/listar/:id/:iduser', checkToken, getUserRank, listarAnime);
animeRouter.get('/getMenorAno', checkToken, getMenorAno);
animeRouter.get('/animesMaisAcessados', checkToken, animesMaisAcessados);
animeRouter.get('/fastSearch/:value', checkToken, fastSearch);

module.exports = animeRouter;