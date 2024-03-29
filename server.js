//TimeZone para São Paulo
process.env.TZ = 'America/Sao_Paulo';

//Importações Principais
const express = require('express');
require('express-async-errors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:8080", "http://192.168.0.21:8080"],
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
require('./src/requests/connect')(io);
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const datahora = require('./src/plugins/datahora');

//Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const porta = process.env.PORT || 80;

//Importação de Middlewares
const adminMiddleware = require('./src/middlewares/adminLoginMiddleware');
const checkToken = require('./src/middlewares/login/checkToken');

//Importações do Model
const Usuario = require('./src/models/Usuario');
const Notification = require('./src/models/Notification');

//Rotas Especiais
app.get('/notification/solicitacao/:para/:idSolicitacao', checkToken, (req, res) => {
    let id = req.params.idSolicitacao;
    let para = req.params.para;
    Usuario.findById(para).select('idSocket').then((user) => {
        if(user){
            io.to(user.idSocket).emit('solicitacao', {para: para, id: id});
        }
    });
    res.send({solicitacao: true});
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

//Importações de Roteadores
const adminRouter = require('./src/routes/adminRouter');
const loginRouter = require('./src/routes/loginRouter');
const usuarioRouter = require('./src/routes/usuarioRouter');
const destaqueRouter = require('./src/routes/destaqueRouter');
const animeRouter = require('./src/routes/animeRouter');
const rankRouter = require('./src/routes/rankRouter');
const generoRouter = require('./src/routes/generoRouter');
const episodioRouter = require('./src/routes/episodioRouter');
const postagemRouter = require('./src/routes/postagemRouter');
const comentarioRouter = require('./src/routes/comentarioRouter');
const conversaRouter = require('./src/routes/conversaRouter');

//Rotas Principais
app.use('/login', loginRouter);
app.use('/usuario', usuarioRouter);
app.use('/destaque', checkToken, destaqueRouter);
app.use('/anime', animeRouter);
app.use('/genero', checkToken, generoRouter);
app.use('/episodio', checkToken, episodioRouter);
app.use('/postagem', checkToken, postagemRouter);
app.use('/comentario', checkToken, comentarioRouter);
app.use('/conversa', checkToken, conversaRouter);

//Middleware de erro do Express
app.use((err, req, res, next) => {
    console.log('Erro na API: ' + err);
    return res.json({
        status: "Erro"
    });
});

//Rotas que é necessário estar logado
app.use('/admin', adminMiddleware, adminRouter); //Rota de admin só é acessada se User estiver referênciado na coleção admin
app.use('/ranking', checkToken, rankRouter);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(porta, () => {
    console.clear();
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});
