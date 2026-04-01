//=============================================
//Passo-1, importar sqlite e sqlite3
//=============================================
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

//=============================================
//Passo-2, criando função assincrona
//=============================================
const criarBanco = async() => {

//=============================================
//Passo-3, criar arquivo do banco de dados
//=============================================
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

//=============================================
//Passo-4, criar tabela
//=============================================
    await db.exec(`
            CREATE TABLE IF NOT EXISTS incidentes(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo_problema TEXT,
                localizacao TEXT,
                descricao TEXT,
                prioridade TEXT,
                nome_solicitante TEXT,
                data_registro TEXT,
                hora_registro TEXT,
                status_resolucao TEXT DEFAULT 'Pendente'
            )
        `);
    console.log('Banco de dados configurado!!!');

//=============================================
//Passo-5, Insert (Crud - CREATE)
//=============================================
    const checagem = await db.get(`SELECT COUNT(*) AS total FROM incidentes`);

    if(checagem.total === 0) {
        await db.exec(`
            INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES 
                ('Iluminação', 'Rua das FLores, 123, Bairro das Margaridas', 'Poste queimado há dias', 'Média', 'Ana Clara', '16/03/2026', '10:30'),
                ('Falta de energia', 'Hospital JP2', 'Local na escuridão', 'Alta', 'Antonio Perna Quebrada', '16/03/2026', '22:15'),
                ('Vazamento de água', 'Rua dos Bosques, 1297 Bairro Floresta', 'Cano da rede de água quebrado e vazando', 'Alta', 'Alice Bitencurt', '15/03/2026', '19:33'),
                ('Buraco na estrada', 'Rua Jardin Botanico, 97 Bairro Centro', 'Buraco aberto no asfalto', 'Média', 'Artur Pneu Furado', '13/02/2026', '9:29'),
                ('Desmoronamento', 'Rua das Barreiras, 30 Bairro Morro Alto', 'Encosta de morro dessabado', 'Alta', 'Maria Constance', '02/12/2025', '12:05'),
                ('Pavimentação', 'Avenida C, Bairro D', 'Calçada em mau estado', 'Alta', 'Maria Oliveira', '14/03/2026', '14:30'),
                ('Falta de água', 'Rua T, 146, Jardim Imbarie', 'Moradores sem água', 'Alta', 'Dona Fofoca', '16/03/2026', '10:00')
        `);
    } else {
        console.log(`Banco de dados pronto com ${checagem.total} incidentes`);
    }

//=============================================
//Passo-6, Select (cRud - READ)
//=============================================
    const todosIncidentes = await db.all(`
            SELECT * FROM incidentes
        `);
    console.table(todosIncidentes);

    //exemplo de SELECT especifico
    const chamadosAna = await db.all(`
            SELECT * FROM incidentes 
            WHERE nome_solicitante = "Ana Clara"
        `);
    console.table(chamadosAna);

//=============================================
//Passo-7, Update (crUd - UPDATE)
//=============================================
    await db.run(`
            UPDATE incidentes 
            SET tipo_problema = 'Poste quebrado', 
            localizacao = 'Hospital JP5'
            WHERE id = 2
        `);
    console.log('Dados atualizados');

    await db.run(`
            UPDATE incidentes 
            SET status_resolucao = 'Em Análise'
            WHERE data_registro = '16/03/2026'
        `);
    console.log('Todas as reclamações do dia 16/03/2026 tiveram uma atualização');

    await db.run(`
            UPDATE incidentes
            SET status_resolucao = 'Resolvido' 
            WHERE tipo_problema = 'Falta de energia'
        `);
    console.log('Problema no hospital resolvido');

//=============================================
//Passo-8, DELETE (cruD - DELETE)
//=============================================
    await db.run(`
            DELETE FROM incidentes 
            WHERE id = 2
        `);
    console.log('Registro do ID 2 removido');


    //Relatório/SELECT final
    console.log('Relatório Atualizado(FINAL)');
    const resultadoFinal = await db.all(`
            SELECT * FROM incidentes
        `);
    console.table(resultadoFinal);

    return db; //retorna o banco(entrega a chave do banco pra alguem)
};

//criarBanco();

module.exports = {criarBanco}; //cria uma ponte que permite compartilhar funções entre os arquivos
