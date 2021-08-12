module.exports.index = function(app, req, res){
    res.render('index',{validacao: {}}); //Json de erros, para mais informações acesse o controller chat
}