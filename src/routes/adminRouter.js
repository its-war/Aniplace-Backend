const adminRouter = require('express').Router();

const generoRouter = require('../admin/router/generoRouter');
const animeRouter = require('../admin/router/animeRouter');
const destaqueRouter = require('../admin/router/destaqueRouter');

adminRouter.use('/genero', generoRouter);
adminRouter.use('/anime', animeRouter);
adminRouter.use('/destaque', destaqueRouter);

module.exports = adminRouter;