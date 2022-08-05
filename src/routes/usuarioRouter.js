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

usuarioRouter.post('/cadastrarUsuario', emailCheck, usernameCheck, listarUpdate, cadastrarUsuario);
usuarioRouter.get('/ativar/:chave', ativarUsuario);
usuarioRouter.get('/topUsers', topUsers);
usuarioRouter.put('/updateVersion', listarUpdate, updateVersion);
usuarioRouter.put('/esqueceuSenha', forgotPassWord);
usuarioRouter.get('/esqueceuSenha/:token', ativarNovaSenha);

module.exports = usuarioRouter;