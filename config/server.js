//Importar módulos necessários da aplicação
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//Iniciando o express
var app = express();

//Configurando o EJS - setar view engine e variáveis views do express
app.set('view engine','ejs');
app.set('views','./app/views');

//Configurando os middlewares
app.use(express.static('./app/public')); //Aplica as customizações front end da pasta public nas views
app.use(bodyParser.urlencoded({extended: true})); //Permite recuperar informações passadas por url
app.use(expressValidator()); //Permite o uso do express validator

//Efetuar o auto load das rotas,models e controllers
consign().include('app/routes').then('app/models').then('app/controllers').into(app);


//xportando o app
module.exports = app;