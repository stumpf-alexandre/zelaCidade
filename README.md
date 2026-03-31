![](./img/1.jpg)

# 🚀 Zela Cidade

## 📌 Sobre o Projeto
A API **ZelaCidade** foi criada para registrar e gerenciar problemas urbanos, como:
- Buracos
- Vazamentos
- Lixo
- Iluminação

Essa API nos permite criar, visualizar, atualizar e deletar ocorrências.

---

## 🛠️ Tecnologias Utilizadas
- Node.js
- Express
- SQLite
- SQLite3
- Nodemon
- Postman

---

## 📦 Instalação
`npm install`

---

## ▶️ Como Executar

```bash
npm run dev

```

`http://localhost:3000`

[Clique Aqui](http:localhost:3000)

---

## 🗄️ Banco de Dados
O Banco de Dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

---

## 🧾 Tabela

|Campo                    |Descrição                     |
|-------------------------|------------------------------|
|id                       |Identificador único           |
|tipo_problema            |Tipo do problema              |
|localizacao              |Onde ocorreu                  |
|descricao                |Detalhes do incidente         |
|prioridade               |Baixa, Média ou Alta          |
|nome_solicitante         |Quem registrou                |
|data_registro            |Data do registro              |
|hora_registro            |Hora do registro              |
|status_resulucao         |Status (Padrão: Pendente)     |

---

## 🔗 Endpoints

### Rota Inicial

```http
GET /
```
Retorna uma página HTML simples com informações da API.


### Rota para listar todos os incidentes

```http
GET /incidentes
```
Retorna todos os registros do banco de dados


### Rota para buscar um incidente específico (ID)

```http
GET /incidentes/:id
```
Ex.: /incidentes/1

Retorna uma ocorrência específica.


### Rota para criar um novo incidente

```http
POST /incidentes
```

#### - Body (JSON)

```json
{
        "tipo_problema": "Iluminação",
        "localizacao": "Rua das FLores, 123, Bairro das Margaridas",
        "descricao": "Poste queimado há dias",
        "prioridade": "Média",
        "nome_solicitante": "Ana Clara",
        "data_registro": "16/03/2026",
        "hora_registro": "10:30",
        "status_resolucao": "Em Análise"
    },
```


### Rota para atualizar um incidente

```json
PUT /incidentes/:id
```

#### - Body (JSON)

```json
{
  "descricao": "Luz do poste foi trocada",
  "prioridade": "Baixa",
  "status_resolucao": "Resolvido"
}
```

### Rota para deletar um incidente

```http
DELETE /incidentes/:id
```
---

## 🔐 Segurança

A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?
```

Isso evita o SQL Injection

---

## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com Express
- Métodos/Verbos HTTP

---

## 👩‍💻 Projeto Educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js, por Alexandre

---

## Instalando Node, Express, SQLite, Nodemon:
* No terminal do gitbash, dentro da pasta raiz do projeto,  para instalar o node-js, digite `npm init -y`. Transforma uma pasta comum em um projeto node. (Cria uma pasta package.json com suas dependencias).
* Para instalar o express digite `npm install express`. (Cria as pastas package-lock.js, node_modules e atualiza o package.js)
* Para instalar o nodemon `npm install nodemon --save-dev`, va até a pasta package.json, no script vai tar escrito:
* Instalando o sqLite `npm install sqlite3 sqlite`
* Criando um arquivo digite `touch server.js`, de um espaço e digite `.gitignore` e  de um espaço e digite `database.js`. (cria as pastas server.js, .gitignore e database)
* Comando para testar o servidor vai trocar de `node server.js"` para `npm run dev`, para fazer o nodemon ficar escutando o servidor caso haja alguma alteração
* Va até a pasta package.json, no script vai tar escrito:
  ```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon database.js"
  },
  ```
  -> escreva no script junto com test:
  ```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
  ```