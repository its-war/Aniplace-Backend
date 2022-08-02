const loginRouter = require('express').Router();

const efetuarLogin = require('../controllers/login/efetuarLogin');
const loggout = require('../controllers/login/loggout');
const verificar = require('../controllers/login/validarLogin');

const usernameLogin = require('../middlewares/login/usernameLogin');
const listarUpdate = require('../middlewares/update/listarUpdate');

loginRouter.post('/efetuarLogin', usernameLogin, listarUpdate, efetuarLogin);
loginRouter.get('/loggout', loggout);
loginRouter.get('/validar', listarUpdate, verificar.eAutorizado);

module.exports = loginRouter;
