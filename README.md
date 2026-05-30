# 🎤 Sistema de Palestras - Guia de Desenvolvimento

Bem-vindo ao **Sistema de Palestras**! Este guia explicará como configurar e executar o ambiente de desenvolvimento completo.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **npm** (v7+) - Vem com Node.js
- **Docker** - [Download](https://www.docker.com/)
- **Docker Compose** - [Download](https://docs.docker.com/compose/)
- **Git** - [Download](https://git-scm.com/)

Verifique as instalações:
```bash
node --version
npm --version
docker --version
docker-compose --version
```

---

## 🚀 Setup Rápido (5 minutos)

### 1️⃣ Clone o Repositório

```bash
git clone <seu-repositorio>
cd sistema-palestras
```

### 2️⃣ Inicie o Banco de Dados

```bash
cd infra
docker-compose up -d
```

✅ MySQL rodando em `localhost:3306`

### 3️⃣ Configure a API

```bash
cd ../api-sistema-palestras
npm install
```

Crie arquivo `.env`:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_pass
DB_NAME=sistema_palestras
PORT=3000
```

Crie o admin:
```bash
npm run seed
```

Inicie a API:
```bash
npm run dev
```

✅ API rodando em `http://localhost:3000`

### 4️⃣ Configure a UI

Em outro terminal:

```bash
cd ui-sistema-palestras
npm install
ng serve
```

✅ UI rodando em `http://localhost:4200`

---

## 📂 Estrutura do Projeto

```
sistema-palestras/
├── 📁 api-sistema-palestras/      # Backend em TypeScript + Express
│   ├── src/
│   │   ├── config/               # Configurações (banco, env)
│   │   ├── helpers/              # Utilitários (crypto, etc)
│   │   ├── modules/
│   │   │   ├── usuario/          # Módulo de usuários
│   │   │   ├── palestra/         # Módulo de palestras
│   │   │   └── inscricao/        # Módulo de inscrições
│   │   ├── seeds/                # Scripts de população de dados
│   │   ├── app.ts                # Configuração Express
│   │   └── server.ts             # Inicialização do servidor
│   ├── dist/                     # Arquivos compilados
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── 📁 ui-sistema-palestras/      # Frontend em Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/             # Tela inicial
│   │   │   ├── login/            # Tela de login
│   │   │   ├── cadastro/         # Tela de cadastro
│   │   │   └── ...outros
│   │   ├── main.ts
│   │   └── styles.css
│   ├── package.json
│   └── angular.json
│
├── 📁 infra/                      # Infraestrutura
│   ├── docker-compose.yml        # Configuração MySQL
│   └── scripts.sql               # Scripts SQL iniciais
│
└── README.md                      # Este arquivo
```

---

## 🔧 Guias Detalhados

### 🐳 Banco de Dados (Docker)

#### Iniciar MySQL
```bash
cd infra
docker-compose up -d
```

#### Ver status
```bash
docker-compose ps
```

#### Parar MySQL
```bash
docker-compose down
```

#### Conectar ao MySQL manualmente
```bash
docker exec -it sistema-palestras-mysql mysql -u root -p sistema_palestras
# Senha: root_pass
```

#### Limpar tudo (cuidado!)
```bash
docker-compose down -v
```

---

### 🔙 Backend (API)

#### 📦 Instalação
```bash
cd api-sistema-palestras
npm install
```

#### ⚙️ Configuração

Crie `.env` na raiz de `api-sistema-palestras/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_pass
DB_NAME=sistema_palestras
PORT=3000
```

#### 🌱 Seed (Popular dados iniciais)
```bash
npm run seed
```

Cria um usuário administrador:
- **Email**: admin@sistema.com
- **Senha**: admin123

#### 🚀 Desenvolvimento (com hot reload)
```bash
npm run dev
```

Servidor disponível em: `http://localhost:3000`

#### 📦 Compilar para Produção
```bash
npm run build
```

Gera arquivos em `dist/`

#### ▶️ Rodar Produção
```bash
npm start
```

---

### 🎨 Frontend (UI)

#### 📦 Instalação
```bash
cd ui-sistema-palestras
npm install
```

#### 🚀 Desenvolvimento
```bash
ng serve
# ou
npm start
```

Aplicação disponível em: `http://localhost:4200`

#### 🔨 Build para Produção
```bash
ng build
```

Gera arquivos em `dist/ui-sistema-palestras/`

#### 📝 Rodar Testes
```bash
ng test
```

#### 🧹 Lint
```bash
ng lint
```

---

## 🔐 Autenticação e Usuários

### Credenciais Padrão (Admin)
```
Email: admin@sistema.com
Senha: admin123
```

⚠️ **Altere a senha imediatamente após o primeiro login!**

### Fluxo de Autenticação

1. **Usuário faz login** → POST `/api/login`
2. **API valida credenciais** e criptografa senha com bcrypt
3. **Retorna dados do usuário** se válido
4. **Frontend armazena** dados em localStorage
5. **Usuário acessa a aplicação**

### Criptografia de Senha

Senhas são criptografadas com **bcrypt** (10 rounds):
- Cadastro: senha é hasheada antes de salvar
- Login: senha fornecida é comparada com hash armazenado
- Banco: nunca armazena senha original

---

## 📡 Endpoints da API

### Usuários
```
POST   /api/cadastro              # Registrar novo usuário
POST   /api/login                 # Login
GET    /api/usuarios              # Listar usuários (admin)
GET    /api/usuarios/:id          # Obter usuário por ID
```

### Palestras
```
POST   /api/admin                 # Criar nova palestra
GET    /api/palestras             # Listar palestras
GET    /api/palestras/:id         # Obter palestra por ID
PUT    /api/palestras/:id         # Atualizar palestra
DELETE /api/palestras/:id         # Deletar palestra
```

### Inscrições
```
POST   /api/inscricao             # Inscrever em palestra
GET    /api/inscricoes            # Listar inscrições (admin)
GET    /api/inscricoes/:id        # Obter inscrição
GET    /api/inscricoes/usuario/:id   # Inscrições do usuário
GET    /api/inscricoes/palestra/:id  # Participantes da palestra
DELETE /api/inscricoes/:id        # Cancelar inscrição
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
```bash
# Verifique se MySQL está rodando
docker-compose ps

# Inicie se necessário
docker-compose up -d
```

### Erro: "Port 3000 already in use"
```bash
# Mude a porta no .env
PORT=3001
```

### Erro: "Module not found"
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "ng command not found"
```bash
# Instale globalmente
npm install -g @angular/cli
```

### API não conecta ao banco
1. Verifique credenciais em `.env`
2. Confirme MySQL está rodando: `docker-compose ps`
3. Teste conexão: `docker exec -it sistema-palestras-mysql mysql -u root -p -e "SELECT 1"`

---

## 🔄 Workflow de Desenvolvimento

### Terminal 1 - Banco de Dados
```bash
cd infra
docker-compose up
```

### Terminal 2 - API
```bash
cd api-sistema-palestras
npm run dev
```

### Terminal 3 - UI
```bash
cd ui-sistema-palestras
ng serve
```


---

## 📚 Documentação

- [API Backend](./api-sistema-palestras/README.md)
- [Angular Documentation](https://angular.io/docs)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)



## 📄 Licença

ISC

---

## 👤 Autor

Samuel Aguiar

---

