const episodioRouter = require('express').Router();

const getEpisodio = require('../controllers/episodio/getEpisodio');
const setEpisodioProgresso = require('../controllers/episodio/setEpisodioProgresso');

episodioRouter.get('/get/:idAnime/:temporada/:numero', getEpisodio);
episodioRouter.post('/setEpisodioProgresso', setEpisodioProgresso);

module.exports = episodioRouter;