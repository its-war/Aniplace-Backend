const episodioRouter = require('express').Router();

const getEpisodio = require('../controllers/episodio/getEpisodio');
const setEpisodioProgresso = require('../controllers/episodio/setEpisodioProgresso');
const getLancamentos = require('../controllers/episodio/getLancamentos');
const listarLancamentos = require('../controllers/episodio/listarLancamentos');

episodioRouter.get('/get/:idAnime/:temporada/:numero', getEpisodio);
episodioRouter.post('/setEpisodioProgresso', setEpisodioProgresso);
episodioRouter.get('/getLancamentos', getLancamentos);
episodioRouter.get('/listarLancamentos/:pagina', listarLancamentos);

module.exports = episodioRouter;