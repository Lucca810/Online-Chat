//Importar configs
var app = require('./config/server');
//Parametrizar a porta
var server = app.listen(80,function(){console.log('Servidor online');});

var io = require('socket.io').listen(server); // isso é possível por serem protocolos diferentes

app.set('io', io);//Seta o valor de uma nova variavel com o nome escolhido por mim como global

//Criar a conexão por websocket

io.on('connection', function(socket){
    console.log('usuário conectou'); // exibe msg de conexão
    socket.on('disconnect', function(){console.log('usuário desconectou');});//Exibe msg de deconexão do usuário
    socket.on('msgParaServidor', function(data){
        //Enviar mensagens
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        //Ajustar participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    });
});//Procura por eventos de conexões das partes do client