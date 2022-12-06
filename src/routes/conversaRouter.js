const conversaRouter = require('express').Router();

const getConversas = require('../controllers/conversa/getConversas');
const newConversa = require('../controllers/conversa/newConversa');
const getConversa = require('../controllers/conversa/getConversa');
const carregarMensagens = require('../controllers/conversa/carregarMensagens');

conversaRouter.get('/getConversas', getConversas);
conversaRouter.post('/newConversa', newConversa);
conversaRouter.get('/getConversa/:id', getConversa);
conversaRouter.get('/carregarMensagens/:id/:pagina/:limite', carregarMensagens);

module.exports = conversaRouter;