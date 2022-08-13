const episodioRouter = require('express').Router();

const getEpisodio = require('../controllers/episodio/getEpisodio');
const setEpisodioProgresso = require('../controllers/episodio/setEpisodioProgresso');
const getLancamentos = require('../controllers/episodio/getLancamentos');

episodioRouter.get('/get/:idAnime/:temporada/:numero', getEpisodio);
episodioRouter.post('/setEpisodioProgresso', setEpisodioProgresso);
episodioRouter.get('/getLancamentos', getLancamentos);

module.exports = episodioRouter;