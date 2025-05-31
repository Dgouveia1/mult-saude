
const db = require('../db');

/**
 * Controlador para operações relacionadas a médicos
 */
module.exports = {
  /**
   * Lista todos os médicos cadastrados
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getAllDoctors: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM doctors ORDER BY name');
      res.json(result.rows);
    } catch (err) {
      console.error('Erro ao buscar médicos:', err);
      res.status(500).json({ error: 'Erro interno ao buscar médicos' });
    }
  },

  /**
   * Obtém um médico pelo ID
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getDoctorById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('SELECT * FROM doctors WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao buscar médico:', err);
      res.status(500).json({ error: 'Erro interno ao buscar médico' });
    }
  },

  /**
   * Cria um novo médico
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  createDoctor: async (req, res) => {
    try {
      const { name, specialty, crm, phone, email, office, schedule } = req.body;
      
      // Validação básica dos campos obrigatórios
      if (!name || !specialty || !crm) {
        return res.status(400).json({ error: 'Nome, especialidade e CRM são obrigatórios' });
      }
      
      // Verifica se o CRM já existe
      const existingCrm = await db.query('SELECT id FROM doctors WHERE crm = $1', [crm]);
      if (existingCrm.rows.length > 0) {
        return res.status(400).json({ error: 'CRM já cadastrado' });
      }
      
      // Insere o novo médico no banco
      const result = await db.query(
        `INSERT INTO doctors 
        (name, specialty, crm, phone, email, office, schedule) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [name, specialty, crm, phone || null, email || null, office || null, schedule || null]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao criar médico:', err);
      res.status(500).json({ error: 'Erro interno ao criar médico' });
    }
  },

  /**
   * Atualiza um médico existente
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  updateDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, specialty, crm, phone, email, office, schedule } = req.body;
      
      // Validação básica dos campos obrigatórios
      if (!name || !specialty || !crm) {
        return res.status(400).json({ error: 'Nome, especialidade e CRM são obrigatórios' });
      }
      
      // Verifica se o médico existe
      const existingDoctor = await db.query('SELECT id FROM doctors WHERE id = $1', [id]);
      if (existingDoctor.rows.length === 0) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      // Verifica se o novo CRM já está em uso por outro médico
      const existingCrm = await db.query('SELECT id FROM doctors WHERE crm = $1 AND id <> $2', [crm, id]);
      if (existingCrm.rows.length > 0) {
        return res.status(400).json({ error: 'CRM já está em uso por outro médico' });
      }
      
      // Atualiza os dados do médico
      const result = await db.query(
        `UPDATE doctors SET 
         name = $1, specialty = $2, crm = $3, phone = $4, 
         email = $5, office = $6, schedule = $7
         WHERE id = $8
         RETURNING *`,
        [name, specialty, crm, phone || null, email || null, office || null, schedule || null, id]
      );
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao atualizar médico:', err);
      res.status(500).json({ error: 'Erro interno ao atualizar médico' });
    }
  },

  /**
   * Exclui um médico
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  deleteDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Verifica se o médico existe
      const existingDoctor = await db.query('SELECT id FROM doctors WHERE id = $1', [id]);
      if (existingDoctor.rows.length === 0) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      
      // Verifica se o médico tem consultas agendadas
      const hasAppointments = await db.query(
        'SELECT id FROM appointments WHERE doctor = (SELECT name FROM doctors WHERE id = $1)',
        [id]
      );
      
      if (hasAppointments.rows.length > 0) {
        return res.status(400).json({ 
          error: 'Não é possível excluir médico com consultas agendadas' 
        });
      }
      
      // Exclui o médico
      await db.query('DELETE FROM doctors WHERE id = $1', [id]);
      res.json({ message: 'Médico excluído com sucesso' });
    } catch (err) {
      console.error('Erro ao excluir médico:', err);
      res.status(500).json({ error: 'Erro interno ao excluir médico' });
    }
  },

  /**
   * Busca médicos por especialidade
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getDoctorsBySpecialty: async (req, res) => {
    try {
      const { specialty } = req.query;
      
      if (!specialty) {
        return res.status(400).json({ error: 'Especialidade é obrigatória' });
      }
      
      const result = await db.query(
        'SELECT * FROM doctors WHERE specialty ILIKE $1 ORDER BY name',
        [`%${specialty}%`]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error('Erro ao buscar médicos por especialidade:', err);
      res.status(500).json({ error: 'Erro interno na busca' });
    }
  }
};
