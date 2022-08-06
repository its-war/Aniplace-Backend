const episodioRouter = require('express').Router();

const cadastrarEpisodio = require('../controllers/episodio/cadastrarEpisodio');

episodioRouter.post('/cadastrar', cadastrarEpisodio);

module.exports = episodioRouter;