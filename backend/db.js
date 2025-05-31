const { Pool } = require('pg');

/**
 * Configura e exporta o pool de conexões com o PostgreSQL
 * As credenciais são carregadas do arquivo .env
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Testa a conexão com o banco ao iniciar
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Falha ao conectar ao PostgreSQL:', err);
  } else {
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
