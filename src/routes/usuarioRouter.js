const usuarioRouter = require('express').Router();

const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario');
const ativarUsuario = require('../controllers/usuario/ativarUsuario');
const topUsers = require('../controllers/usuario/topUsers');
const updateVersion = require('../controllers/usuario/updateVersion');
const forgotPassWord = require('../controllers/usuario/forgotPassWord');
const ativarNovaSenha = require('../controllers/usuario/ativarNovaSenha');
const solicitarAmizade = require('../controllers/usuario/solicitarAmizade');
const getSolicitacoes = require('../controllers/usuario/getSolicitacoes');
const getSolicitacao = require('../controllers/usuario/getSolicitacao');
const aceitarSolicitacao = require('../controllers/usuario/aceitarSolicitacao');
const userGetInfoPublic = require('../controllers/usuario/userGetInfoPublic');
const hasSolicitacao = require('../controllers/usuario/hasSolicitacao');
const getNotifications = require('../controllers/usuario/getNotifications');
const setLidoTodos = require('../controllers/usuario/setLidoTodos');
const desfazerAmizade = require('../controllers/usuario/desfazerAmizade');

//middlewares
const emailCheck = require('../middlewares/cadastro/emailCheck');
const usernameCheck = require('../middlewares/cadastro/usernameCheck');
const listarUpdate = require('../middlewares/update/getVersion');
const checkToken = require('../middlewares/login/checkToken');

usuarioRouter.post('/cadastrarUsuario', emailCheck, usernameCheck, listarUpdate, cadastrarUsuario);
usuarioRouter.get('/ativar/:chave', ativarUsuario);
usuarioRouter.get('/topUsers', checkToken, topUsers);
usuarioRouter.put('/updateVersion', checkToken, listarUpdate, updateVersion);
usuarioRouter.put('/esqueceuSenha', forgotPassWord);
usuarioRouter.get('/esqueceuSenha/:token', ativarNovaSenha);
usuarioRouter.get('/solicitarAmizade/:para', checkToken, solicitarAmizade);
usuarioRouter.get('/getSolicitacoes', checkToken, getSolicitacoes);
usuarioRouter.get('/getSolicitacao/:id', checkToken, getSolicitacao);
usuarioRouter.get('/aceitarSolicitacao/:de', checkToken, aceitarSolicitacao);
usuarioRouter.get('/recusarSolicitacao/:solicitacao', checkToken);
usuarioRouter.get('/desfazerAmizade/:id', checkToken, desfazerAmizade);
usuarioRouter.get('/userGetInfoPublic/:id', checkToken, userGetInfoPublic);
usuarioRouter.get('/hasSolicitacao/:id', checkToken, hasSolicitacao);
usuarioRouter.get('/getNotifications', checkToken, getNotifications);
usuarioRouter.get('/setLidoTodos', checkToken, setLidoTodos);

module.exports = usuarioRouter;