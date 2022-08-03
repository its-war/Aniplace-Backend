const rankRouter = require('express').Router();

const votarAnime = require('../controllers/rank/votarAnime');
const getRanking = require('../controllers/rank/getRanking');
const postRanking = require('../middlewares/usuario/postUserRank');

rankRouter.post('/votar', postRanking, votarAnime);
rankRouter.get('/get/:anime', getRanking);

module.exports = rankRouter;