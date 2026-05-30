# API Sistema de Palestras

API backend para o sistema de palestras, desenvolvida em TypeScript com Express e MySQL.

## Estrutura do Projeto

```
src/
├── config/
│   └── database.ts          # Configuração de conexão com MySQL
├── modules/
│   ├── usuario/
│   │   ├── controller.ts    # Controlador de usuários
│   │   ├── repository.ts    # Acesso a dados de usuários
│   │   ├── service.ts       # Lógica de negócio de usuários
│   │   └── routes.ts        # Rotas de usuários
│   ├── palestra/
│   │   ├── controller.ts    # Controlador de palestras
│   │   ├── repository.ts    # Acesso a dados de palestras
│   │   ├── service.ts       # Lógica de negócio de palestras
│   │   └── routes.ts        # Rotas de palestras
│   └── inscricao/
│       ├── controller.ts    # Controlador de inscrições
│       ├── repository.ts    # Acesso a dados de inscrições
│       ├── service.ts       # Lógica de negócio de inscrições
│       └── routes.ts        # Rotas de inscrições
├── app.ts                   # Configuração da aplicação Express
└── server.ts                # Inicialização do servidor
```

## Arquitetura em Camadas

Cada módulo segue a arquitetura em camadas:

- **Routes**: Define os endpoints HTTP
- **Controller**: Recebe requisições e envia respostas
- **Service**: Implementa lógica de negócio
- **Repository**: Acessa dados do banco de dados

## Instalação

1. Instale as dependências:
```bash
npm install
```

### 2. Configure o arquivo `.env` com as credenciais do banco de dados:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_pass
DB_NAME=sistema_palestras
PORT=3000
```

### 3. Criar Admin via Seed

Execute o seed para criar um usuário administrador com senha pré-definida:

```bash
npm run seed
```

**Saída esperada:**
```
🌱 Iniciando seed de dados...
✅ Admin criado com sucesso!
   Email: admin@sistema.com
   Senha: admin123
⚠️  IMPORTANTE: Altere a senha padrão do admin!
```

## Desenvolvimento

Para executar em modo de desenvolvimento com hot reload:

```bash
npm run dev
```

## Build

Para compilar o TypeScript para JavaScript:

```bash
npm run build
```

## Produção

Para executar a aplicação compilada:

```bash
npm start
```

## Endpoints da API

### Usuários

- `POST /api/cadastro` - Cadastrar novo usuário
- `POST /api/login` - Fazer login
- `GET /api/usuarios` - Listar todos os usuários
- `GET /api/usuarios/:id` - Obter usuário por ID

### Palestras

- `POST /api/admin` - Criar nova palestra
- `GET /api/palestras` - Listar todas as palestras
- `GET /api/palestras/:id` - Obter palestra por ID
- `PUT /api/palestras/:id` - Atualizar palestra
- `DELETE /api/palestras/:id` - Deletar palestra

### Inscrições

- `POST /api/inscricao` - Inscrever em uma palestra
- `GET /api/inscricoes` - Listar todas as inscrições
- `GET /api/inscricoes/:id` - Obter inscrição por ID
- `GET /api/inscricoes/usuario/:idUsuario` - Listar inscrições de um usuário
- `GET /api/inscricoes/palestra/:idPalestra` - Listar inscrições de uma palestra
- `DELETE /api/inscricoes/:id` - Cancelar inscrição

## Tecnologias

- TypeScript
- Express.js
- MySQL2/promise
- CORS
- ts-node

## Próximos Passos

- Adicionar validações mais robustas
- Implementar autenticação com JWT
- Adicionar tratamento de erros mais detalhado
- Implementar testes unitários
- Adicionar logging
- Documentação com Swagger/OpenAPI
