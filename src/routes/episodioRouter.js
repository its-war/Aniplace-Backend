const episodioRouter = require('express').Router();

const getEpisodio = require('../controllers/episodio/getEpisodio');

episodioRouter.get('/get/:idAnime/:temporada/:numero', getEpisodio);

module.exports = episodioRouter;