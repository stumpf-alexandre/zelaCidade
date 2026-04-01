//Importação
const express = require('express'); //framework que cria o servidor e as rotas
const {criarBanco} = require('./database'); //a chave que vai abrir a conexão com o banco de dados
const cors = require('cors'); //importando o pacote que gerencia as permições de acesso
const app = express(); //inicialização: ligando o motor do servidor

//Ativação
app.use(cors()); //ativando o CORS no servidor
app.use(express.json()); //tradutor: configura o express para entender dados no formato JSON

//criando a rota principal '/', rota raiz
app.get('/', (req, res) => {
    res.send(`
            <body>
                <h1>Zela Cidade</h1>
                <h2>Gestão de Problemas Urbanos</h2>
                <p>Endpoint que leva aos incidentes cadastrados: <a href="https://zelacidade-fv9m.onrender.com/incidentes">/incidentes</a></p>
                <p>Endpoint que leva aos incidentes cadastrados: <a href="https://zelacidade-fv9m.onrender.com/incidentes/4">/incidentes especificos</a></p>
                <p>Endpoint que leva aos incidentes cadastrados localmente: <a href="http://localhost:${PORT}/incidentes">/incidentes</a></p>
                <p>Endpoint que leva aos incidentes cadastrados localmente: <a href="http://localhost:${PORT}/incidentes/4">/incidentes especificos</a></p>
            </body>
        `); //envia uma resposta simples(texto, html, json)

});

//rota de listagem - para buscar todos os problemas registrados
app.get('/incidentes', async (req, res) => {
    const db = await criarBanco() //chamamos a função do outro arquivo. O await "aguarde", pois o banco precisa de tempo para abrir
    const listaIncidentes = await db.all(`SELECT * FROM incidentes`);
    res.json(listaIncidentes); //entrega esses dados para o cliente no formato JSON
});

//Rota especifica
app.get('/incidentes/:id', async (req, res) => {
    const { id } = req.params;
    const db = await criarBanco();
    const incidenteEspecifico = await db.all(`
            SELECT * FROM incidentes WHERE id = ?
        `, [id]);
        //o ? é um espaço reservado que será preenchido pelo valor da variavel [id]
        //o ? SQL Injection é usado para segurança

    res.json(incidenteEspecifico);
});

//ROta POST - novo registros /Endpoints
app.post('/incidentes', async (req, res) => {
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro} = req.body;

    const db = await criarBanco();

    //o run executa alguma coisa
    await db.run(`
            INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro]);

    //envia uma resposta de confirmação para o cliente que fez z requisição
    res.send(`Incidente novo: ${tipo_problema}, registrado na data ${data_registro} por ${nome_solicitante}`);
});

//Rota de atualização
app.put('/incidentes/:id', async (req, res) => {
    //pega o id do incidente que vem pela URL (ex>: /incidentes/4)
    const { id } = req.params;

    //Pega os novos dados enviados no corpo da requisição (O que será atualizado)
    const {descricao, prioridade, status_resolucao} = req.body;

    //Abre a conexão com o banco de dados
    const db = await criarBanco();

    await db.run(`
            UPDATE incidentes 
            SET descricao = ?, prioridade = ?, status_resolucao = ? 
            WHERE id = ?
        `, [descricao, prioridade, status_resolucao, id]);
    //Enviar uma resposta para o cliente
    res.send(`O incidente de id ${id} foi atualizada com sucesso`);
});

//Rota de remoção
app.delete('/incidentes/:id', async (req, res) => {
    //Pega o id do incidente que vem pela URL (ex.: /incidentes/4)
    const { id } = req.params;

    //Abre a conexão com o banco de dados
    const db = await criarBanco();

    await db.run(`
            DELETE FROM incidentes WHERE id = ?
        `, [id]);
    res.send(`O incidente de id ${id} foi removido com sucesso`);
});

//criando uma variavel inteligente para a porta
const PORT = process.env.PORT || 3000;

//ligando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});