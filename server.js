//Importações Principais
const express = require('express');
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

//Importações de Rotas
const loginRouter = require('./src/routes/loginRouter');
const usuarioRouter = require('./src/routes/usuarioRouter');

//Implementação de Rotas
app.use('/login', loginRouter);
app.use('/usuario', usuarioRouter);

const porta = process.env.PORT || 80;

app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(porta, () => {
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});

//TODO fazer rotas de fansub e genero (cadastro e listagem)