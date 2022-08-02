const rankRouter = require('express').Router();

const votarAnime = require('../controllers/rank/votarAnime');

rankRouter.post('/votarAnime', votarAnime);

module.exports = rankRouter;