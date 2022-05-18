const loginRouter = require('express').Router();

const efetuarLogin = require('../controllers/login/efetuarLogin');
const loggout = require('../controllers/login/loggout');

loginRouter.post('/efetuarLogin', efetuarLogin);
loginRouter.get('/loggout', loggout);

module.exports = loginRouter;
