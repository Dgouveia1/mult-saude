const db = require('../db');

/**
 * Controlador para operações relacionadas a consultas médicas
 */
module.exports = {
  /**
   * Obtém consultas por data
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getAppointmentsByDate: async (req, res) => {
    try {
      const { date } = req.query;
      
      // Validação básica da data
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD' });
      }

      // Busca consultas no banco
      const result = await db.query(
        'SELECT * FROM appointments WHERE date = $1 ORDER BY time',
        [date]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      res.status(500).json({ error: 'Erro interno ao buscar consultas' });
    }
  },

  /**
   * Cria ou atualiza uma consulta
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  saveAppointment: async (req, res) => {
    try {
      const { id, name, phone, service, doctor, time, insurance, status, observations, date } = req.body;
      
      // Validação básica dos dados
      if (!name || !service || !doctor || !time || !status || !date) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }

      // Se houver ID, atualiza a consulta existente
      if (id) {
        await db.query(
          `UPDATE appointments SET 
           name = $1, phone = $2, service = $3, doctor = $4, time = $5, 
           insurance = $6, status = $7, observations = $8, date = $9
           WHERE id = $10`,
          [name, phone, service, doctor, time, insurance, status, observations, date, id]
        );
        return res.json({ message: 'Consulta atualizada com sucesso!', id });
      } 
      // Caso contrário, cria uma nova consulta
      else {
        const result = await db.query(
          `INSERT INTO appointments 
          (name, phone, service, doctor, time, insurance, status, observations, date) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id`,
          [name, phone, service, doctor, time, insurance, status, observations, date]
        );
        return res.status(201).json({ 
          message: 'Consulta criada com sucesso!', 
          id: result.rows[0].id 
        });
      }
    } catch (err) {
      console.error('Erro ao salvar consulta:', err);
      res.status(500).json({ error: 'Erro interno ao salvar consulta' });
    }
  },

  /**
   * Exclui uma consulta
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM appointments WHERE id = $1', [id]);
      res.json({ message: 'Consulta excluída com sucesso!' });
    } catch (err) {
      console.error('Erro ao excluir consulta:', err);
      res.status(500).json({ error: 'Erro interno ao excluir consulta' });
    }
  }
};
