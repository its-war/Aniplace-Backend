const usuarioRouter = require('express').Router();

const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario');
const ativarUsuario = require('../controllers/usuario/ativarUsuario');
const topUsers = require('../controllers/usuario/topUsers');
const updateVersion = require('../controllers/usuario/updateVersion');
const forgotPassWord = require('../controllers/usuario/forgotPassWord');
const ativarNovaSenha = require('../controllers/usuario/ativarNovaSenha');

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
usuarioRouter.get('/solicitarAmizade/:para', checkToken);
usuarioRouter.get('/aceitarSolicitacao/:solicitacao', checkToken);
usuarioRouter.get('/recusarSolicitacao/:solicitacao', checkToken);
usuarioRouter.get('/desfazerAmizade/:idUser', checkToken);

module.exports = usuarioRouter;