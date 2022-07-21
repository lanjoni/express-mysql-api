const express = require('express');
const app = express();
const port = 3000; // default 
const mysql = require('mysql2');

app.use(express.json());

app.get('/', (req, res) => res.json(
    { message: 'Tudo funcionando! Siga @lanjoni no GitHub!' }
));

// iniciando o servidor...
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'XXX', // defina seu host
      port     : XXX, // defina sua porta - MySQL padrão é 3306
      user     : 'XXX', // defina seu usuário - Ex: root
      password : 'XXX', // defina sua senha
      database : 'XXX' // defina qual banco de dados
    });
  
    connection.query(sqlQry, (error, results, fields) => {
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('Executado com sucesso!');
    });
}

// TRAZENDO SEUS DADOS!

// sem parâmetros
app.get('/suarota', (req, res) => {
    execSQLQuery('SELECT * FROM SuaTabela', res);
})

// com parâmetros
app.get('/suarota/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id); // a variável filter é utilizada para filtrar sua pesquisa com uma cláusula (WHERE opcional)
    execSQLQuery('SELECT * FROM SuaTabela' + filter, res);
})

//
//
//

// Excluindo
app.get('/suarota/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM SuaTabela' + filter, res); // basicamente é uma simples query
})

//
//
//

// Adicionando - Utilizando POST
app.post('/suarota', (req, res) => {
    const nome = req.body.nome.substring(0,150);
    const rg = req.body.rg.substring(0,9);
    execSQLQuery(`INSERT INTO SuaTabela(Nome, RG) VALUES('${nome}','${rg}')`, res);
});

// Adicionando via CURL:
// curl -X POST -d "nome=lanjoni&rg=123456789" http://localhost:3000/suarota

//
//
//

// Atualizando
app.patch('/suarota/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const rg = req.body.rg.substring(0,11);
    execSQLQuery(`UPDATE SuaTabela SET Nome='${nome}', RG='${rg}' WHERE ID=${id}`, res);
})

// Atualizando via CURL:
// curl -X PATCH -d "nome=lanjoni&cpf=111111111" http://localhost:3000/suarota/1

// FINAL
// Vulnerabilidades quanto a SQL Injection não verificada por ser um código para fins didáticos