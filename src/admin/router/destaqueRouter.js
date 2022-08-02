const destaqueRouter = require('express').Router();

const addDestaque = require('../controllers/destaque/addDestaque');

destaqueRouter.post('/add', addDestaque);

module.exports = destaqueRouter;