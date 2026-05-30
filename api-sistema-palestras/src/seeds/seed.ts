import pool from '../config/database';
import CryptoHelper from '../helpers/crypto';

const ADMIN_EMAIL = 'admin@sistema.com';
const ADMIN_PASSWORD = 'admin123';

async function seed() {
  try {
    console.log('Iniciando seed de dados...');

    // Verificar se o admin já existe
    const [adminExistente] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [ADMIN_EMAIL]
    );

    if (adminExistente && (adminExistente as any[]).length > 0) {
      console.log('Admin já existe no banco de dados!');
      return;
    }

    // Criptografar a senha
    const senhaHash = await CryptoHelper.hashPassword(ADMIN_PASSWORD);

    // Criar o admin
    await pool.execute(
      'INSERT INTO usuarios(nome, email, senha, admin) VALUES(?,?,?,?)',
      ['Administrador', ADMIN_EMAIL, senhaHash, true]
    );

    console.log('Admin criado com sucesso!');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Senha: ${ADMIN_PASSWORD}`);
    console.log('IMPORTANTE: Altere a senha padrão do admin!');
  } catch (error) {
    console.error('Erro ao executar seed:', error);
  } finally {
    await pool.end();
  }
}

seed();
