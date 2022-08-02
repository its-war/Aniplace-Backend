const rankRouter = require('express').Router();

const votarAnime = require('../controllers/rank/votarAnime');
const getRanking = require('../controllers/rank/getRanking');

rankRouter.post('/votarAnime', votarAnime);
rankRouter.get('/get/:anime', getRanking);

module.exports = rankRouter;