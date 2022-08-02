//Importações Principais
const express = require('express');
require('express-async-errors');
const app = express();
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

//Importações de Roteadores
const adminRouter = require('./src/routes/adminRouter');
const loginRouter = require('./src/routes/loginRouter');
const usuarioRouter = require('./src/routes/usuarioRouter');
const destaqueRouter = require('./src/routes/destaqueRouter');
const animeRouter = require('./src/routes/animeRouter');
const rankRouter = require('./src/routes/rankRouter');

//Importação de Middlewares
const adminMiddleware = require('./src/middlewares/adminLoginMiddleware');
const checkToken = require('./src/middlewares/login/checkToken');

//Rotas Principais
app.use('/login', loginRouter);
app.use('/usuario', usuarioRouter);
app.use('/destaque', destaqueRouter);
app.use('/anime', animeRouter);

//Middleware de erro do Express
app.use((err, req, res, next) => {
    return res.json({
        status: "Erro",
        mensagem: err.message
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

app.listen(porta, () => {
    console.clear();
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});

// TODO sempre que for upar o projeto, não esqueça de atualizar os arquivos mail.js

// TODO terminar script dos destaques ------------------------ <<<<<<<<<<<<<<

// TODO criar rotas de 'anime'
