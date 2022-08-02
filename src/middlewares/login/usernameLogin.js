const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    let usuario = req.body.nomeusuario;
    let senha  = req.body.senha;
    let lembrar = req.body.lembrar;

    let user = Usuario.findOne({username: usuario}).exec();
    user.then((doc) => {
        if(doc){
            if(bcrypt.compareSync(senha, doc.senha)){
                switch (doc.ativo){
                    case 0: { // novo usuario, aguardando ativação
                        return res.json({autorizado: false, msg: 'Usuário não ativo, verifique seu email.'});
                    }
                    case 1: { // usuario ativo e sem pendencias
                        req.user = doc;
                        req.lembrar = lembrar;
                        req.msg = '';
                        next();
                        break;
                    }
                    case 2: { // usuario com advertencia
                        req.user = doc;
                        req.lembrar = lembrar;
                        req.msg = 'Usuário com advertência, contate os admins para resolver sua situação.';
                        next();
                        break;
                    }
                    case 3: { // usuario bloqueado temporariamente
                        return res.json({autorizado: false, msg: 'Usuário bloqueado, aguarde o tempo necessário para poder entrar de novo.'});
                    }
                    case 4: { // usuario banido
                        return res.json({autorizado: false, msg: 'Usuário banido! Se acredita que isto é um equívoco, mande um e-mail para: ' + process.env.EMAILADM + ' explicando sua situação.'});
                    }
                    case 5: { // usuario desativado pelo mesmo
                        return res.json({autorizado: false, msg: 'Usuário desativado, se deseja voltar a usar esta conta, mande um e-mail para ' + process.env.EMAILADM + ' usando o email que usou para se cadastrar.'});
                    }
                    default: { // em caso de erro do sistema
                        return res.json({autorizado: false, msg: 'Erro no sistema, tente novamente mais tarde. Se o erro persistir, mande um e-mail para ' + process.env.EMAILADM + ' para nós informar.'});
                    }
                }
            }else{
                return res.json({autorizado: false, msg: 'Nome de Usuário ou senha está incorreto.'});
            }
        }else{
            return res.json({autorizado: false, msg: 'Nome de Usuário ou senha está incorreto.'});
        }
    });
}