# 🚕 Relatório Táxi

API desenvolvida com **NestJS** para consulta de informações de motoristas, permissionários e vínculos de táxi, integrando os bancos de dados **ATENA (SIT)** e **PRD_SEMOB**.

A aplicação disponibiliza endpoints REST documentados com Swagger para consulta de:

- Histórico de alocações de motoristas (ATENA);
- Declaração de vínculos entre motoristas e autorizações (PRD_SEMOB).

---

# 🛠️ Tecnologias

- NestJS 11
- TypeScript
- Oracle Database (oracledb)
- Swagger/OpenAPI
- Class Validator
- Class Transformer
- Express
- ESLint
- Prettier

---

# 🏗️ Estrutura do Projeto

```
src/
├── config/          # Configuração dos bancos Oracle
├── controller/      # Endpoints da API
├── docs/            # Configuração do Swagger
├── dto/             # DTOs de entrada
├── entity/          # Modelos de resposta
├── module/          # Módulos NestJS
├── repository/      # Consultas SQL
├── service/         # Regras de negócio
├── app.module.ts
└── main.ts
```

---

# 📋 Funcionalidades

## Histórico de Motoristas

Consulta o banco **ATENA** retornando:

- CPF
- Nome
- CNH
- Endereço
- Telefone
- Número da autorização
- Datas de entrada e saída
- Tipo de importação
- Data da importação

Endpoint:

```
GET /historico
```

Parâmetros:

| Parâmetro | Obrigatório |
| ---------- | ----------- |
| nome | Não |
| cpf | Não |

Exemplo:

```
GET /historico?cpf=72714263100
```

ou

```
GET /historico?nome=WESLEY
```

---

## 📌 Declaração de Vínculos

Consulta o banco **PRD_SEMOB** retornando:

- Autorização
- Nome
- CPF
- Órgão expedidor
- Número do endereço
- Tipo do vínculo
- Data de início
- Data de fim

Endpoint:

```
GET /declaracao
```

Parâmetros:

| Parâmetro | Obrigatório |
| ---------- | ----------- |
| nome | Não |
| cpf | Não |

Exemplo:

```
GET /declaracao?cpf=72714263100
```

---

# ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
PORT=8080

ORACLE_CLIENT_PATH=C:\oracle\instantclient

DB_ATENA_USERNAME=usuario
DB_ATENA_PASSWORD=senha
DB_ATENA_HOST=host
DB_ATENA_PORT=1521
DB_ATENA_SERVICE=ATENA1

DB_SEMOB_USERNAME=usuario
DB_SEMOB_PASSWORD=senha
DB_SEMOB_HOST=host
DB_SEMOB_PORT=1521
DB_SEMOB_SERVICE=PRD_SEMOB
```

Caso as variáveis não sejam informadas, a aplicação utiliza valores padrão definidos no código.

---

# 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/AnaMachado2/relatorio_taxi.git
```

Entre na pasta:

```bash
cd relatorio_taxi
```

Instale as dependências:

```bash
npm install
```

---

# Executando

Modo desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

A API será iniciada em:

```
http://localhost:8080
```

---

# 🌐 Documentação Swagger

Após iniciar a aplicação:

```
http://localhost:8080/api
```

A documentação permite testar todos os endpoints diretamente pelo navegador.

---

# 🗄️ Banco de Dados

A aplicação utiliza dois pools independentes de conexão Oracle.

## Banco ATENA

Responsável pelas consultas de histórico dos motoristas.

## Banco PRD_SEMOB

Responsável pelas consultas de vínculos entre motoristas e autorizações.

Os pools são inicializados automaticamente quando a aplicação sobe e encerrados durante o desligamento.

---

# Arquitetura

O projeto segue a arquitetura padrão do NestJS:

```
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Oracle Database
```

Cada camada possui uma única responsabilidade:

- **Controller:** recebe as requisições HTTP.
- **Service:** aplica as regras de negócio.
- **Repository:** executa as consultas SQL.
- **Database Service:** gerencia os pools de conexão Oracle.

---

# 🛡️ Validação

Os parâmetros de entrada utilizam:

- class-validator
- ValidationPipe global
- whitelist
- transformação automática de tipos

---

# 📊 Respostas

Caso nenhum registro seja encontrado, a API retorna:

```
HTTP 404
```

Exemplo:

```json
{
  "statusCode": 404,
  "message": "Nenhum registro de histórico encontrado para os filtros informados.",
  "error": "Not Found"
}
```

---

# 📦 Scripts

| Comando | Descrição |
|----------|-----------|
| npm run dev | Executa a aplicação em desenvolvimento |
| npm run build | Gera a versão compilada |

---

# Autor

Projeto desenvolvido para consulta de dados e geração de relatórios relacionados ao sistema de Táxi, utilizando integração com bancos Oracle através do framework NestJS.
