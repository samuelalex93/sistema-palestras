const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

const conexao = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root_pass',
  database: 'sistema_palestras'
});

app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const [usuario] = await conexao.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuario.length > 0) {
      return res.status(400).json({
        message: 'Email já cadastrado'
      });
    }

    await conexao.execute(
      'INSERT INTO usuarios(nome, email, senha) VALUES(?,?,?)',
      [nome, email, senha]
    );

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao cadastrar usuário'
    });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuario] = await conexao.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuario.length === 0) {
      return res.json({
        message: 'Email ou senha inválidos',
        tipoMensagem: 'danger'
      });
    }

    const verificaUsuario = usuario[0];

    if (verificaUsuario.senha !== senha) {
      return res.json({
        message: 'Senha inválida!',
        tipoMensagem: 'danger'
      });
    }

    const userData = {
      id: verificaUsuario.ID,
      email: verificaUsuario.email,
      nome: verificaUsuario.nome,
      admin: verificaUsuario.admin
    };

    res.json({
      message: 'Login realizado com sucesso!',
      userData,
      tipoMensagem: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao logar!'
    });
  }
});

app.post('/api/admin', async (req, res) => {
  const {
    titulo,
    descricao,
    nomePalestrante,
    localEvento,
    dataEvento
  } = req.body;

  const dadosEvento = [
    titulo,
    descricao,
    nomePalestrante,
    localEvento,
    dataEvento
  ];

  try {
    await conexao.execute(
      `INSERT INTO palestra(
        titulo,
        descricao,
        nomePalestrante,
        localEvento,
        dataEvento
      ) VALUES(?,?,?,?,?)`,
      dadosEvento
    );

    res.status(201).json({
      message: 'Evento cadastrado com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao cadastrar evento!'
    });
  }
});

app.get('/api/palestras', async (req, res) => {
  try {
    const [rows] = await conexao.execute(
      'SELECT * FROM palestra'
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: 'Erro interno'
    });
  }
});

app.post('/api/inscricao', async (req, res) => {
  const { idUsuario, idPalestra } = req.body;

  try {
    await conexao.execute(
      'INSERT INTO inscricoes (idUsuario, idPalestra) VALUES (?, ?)',
      [idUsuario, idPalestra]
    );

    res.status(201).json({
      message: 'Inscrição realizada :)'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: 'Você já se inscreveu nesse evento!'
      });
    } else {
      res.status(500).json({
        message: 'Erro ao realizar a inscrição :('
      });
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});