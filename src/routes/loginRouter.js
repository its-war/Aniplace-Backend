const loginRouter = require('express').Router();

const efetuarLogin = require('../controllers/login/efetuarLogin');
const loggout = require('../controllers/login/loggout');
const verificar = require('../controllers/login/validarLogin')

loginRouter.post('/efetuarLogin', efetuarLogin);
loginRouter.get('/loggout', loggout);
loginRouter.get('/validar', verificar.eAutorizado);

module.exports = loginRouter;
