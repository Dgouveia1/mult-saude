const db = require('../db');

/**
 * Controlador para operações relacionadas a pacientes
 */
module.exports = {
  /**
   * Lista todos os pacientes com suporte a paginação e busca
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getAllPatients: async (req, res) => {
    try {
      // Parâmetros de paginação e filtro
      const { page = 1, limit = 10, search = '' } = req.query;
      const offset = (page - 1) * limit;
      
      // Preparar parâmetros para busca
      const queryParams = [];
      let whereClause = '';
      
      if (search) {
        whereClause = `WHERE name ILIKE $${queryParams.length + 1} OR phone ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${search}%`);
      }
      
      // Buscar pacientes
      const patientsQuery = `
        SELECT * FROM patients 
        ${whereClause}
        ORDER BY name 
        LIMIT $${queryParams.length + 1} 
        OFFSET $${queryParams.length + 2}
      `;
      
      const result = await db.query(
        patientsQuery,
        [...queryParams, limit, offset]
      );
      
      // Contagem total para paginação
      const countQuery = `
        SELECT COUNT(*) FROM patients 
        ${whereClause}
      `;
      
      const countResult = await db.query(countQuery, queryParams);
      const totalPatients = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalPatients / limit);
      
      res.json({
        patients: result.rows,
        pagination: {
          currentPage: parseInt(page, 10),
          totalPages,
          totalPatients,
          patientsPerPage: parseInt(limit, 10)
        }
      });
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      res.status(500).json({ error: 'Erro interno ao buscar pacientes' });
    }
  },

  /**
   * Obtém um paciente pelo ID
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getPatientById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('SELECT * FROM patients WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao buscar paciente:', err);
      res.status(500).json({ error: 'Erro interno ao buscar paciente' });
    }
  },

  /**
   * Cria um novo paciente
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  createPatient: async (req, res) => {
    try {
      const { name, phone, email, city, birth_date, first_experience, insurance, tags } = req.body;
      
      // Validação básica dos campos obrigatórios
      if (!name || !phone) {
        return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
      }
      
      // Verificar se paciente já existe pelo telefone
      const existingPatient = await db.query(
        'SELECT id FROM patients WHERE phone = $1',
        [phone]
      );
      
      if (existingPatient.rows.length > 0) {
        return res.status(400).json({ error: 'Paciente com este telefone já cadastrado' });
      }
      
      // Inserir novo paciente
      const result = await db.query(
        `INSERT INTO patients 
        (name, phone, email, city, birth_date, first_experience, insurance, tags) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [name, phone, email || null, city || null, birth_date || null, 
         first_experience || null, insurance || null, tags || []]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao criar paciente:', err);
      res.status(500).json({ error: 'Erro interno ao criar paciente' });
    }
  },

  /**
   * Atualiza um paciente existente
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  updatePatient: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, city, birth_date, first_experience, insurance, tags } = req.body;
      
      // Validação básica dos campos obrigatórios
      if (!name || !phone) {
        return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
      }
      
      // Verificar se o telefone já está em uso por outro paciente
      const existingPhone = await db.query(
        'SELECT id FROM patients WHERE phone = $1 AND id <> $2',
        [phone, id]
      );
      
      if (existingPhone.rows.length > 0) {
        return res.status(400).json({ error: 'Telefone já está em uso por outro paciente' });
      }
      
      // Atualizar paciente
      const result = await db.query(
        `UPDATE patients SET 
         name = $1, phone = $2, email = $3, city = $4, 
         birth_date = $5, first_experience = $6, insurance = $7, tags = $8
         WHERE id = $9
         RETURNING *`,
        [name, phone, email || null, city || null, birth_date || null, 
         first_experience || null, insurance || null, tags || [], id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      res.status(500).json({ error: 'Erro interno ao atualizar paciente' });
    }
  },

  /**
   * Exclui um paciente
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  deletePatient: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se o paciente existe
      const existingPatient = await db.query(
        'SELECT id FROM patients WHERE id = $1',
        [id]
      );
      
      if (existingPatient.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      
      // Verificar se o paciente tem consultas futuras
      const hasFutureAppointments = await db.query(
        `SELECT id FROM appointments 
         WHERE patient_id = $1 AND date >= CURRENT_DATE`,
        [id]
      );
      
      if (hasFutureAppointments.rows.length > 0) {
        return res.status(400).json({ 
          error: 'Não é possível excluir paciente com consultas futuras agendadas' 
        });
      }
      
      // Excluir paciente
      await db.query('DELETE FROM patients WHERE id = $1', [id]);
      
      res.json({ message: 'Paciente excluído com sucesso' });
    } catch (err) {
      console.error('Erro ao excluir paciente:', err);
      res.status(500).json({ error: 'Erro interno ao excluir paciente' });
    }
  },

  /**
   * Busca pacientes por nome ou telefone
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  searchPatients: async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || query.trim().length < 3) {
        return res.status(400).json({ error: 'A busca deve ter pelo menos 3 caracteres' });
      }
      
      const searchTerm = `%${query}%`;
      const result = await db.query(
        `SELECT id, name, phone, city 
         FROM patients 
         WHERE name ILIKE $1 OR phone ILIKE $1 
         ORDER BY name 
         LIMIT 10`,
        [searchTerm]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      res.status(500).json({ error: 'Erro interno ao buscar pacientes' });
    }
  },

  /**
   * Obtém o histórico de consultas de um paciente
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getPatientHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit = 10 } = req.query;
      
      // Verificar se o paciente existe
      const patientExists = await db.query(
        'SELECT id FROM patients WHERE id = $1',
        [id]
      );
      
      if (patientExists.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      
      // Buscar histórico de consultas
      const result = await db.query(
        `SELECT a.id, a.date, a.time, a.service, a.doctor, a.status, a.observations
         FROM appointments a
         WHERE a.patient_id = $1
         ORDER BY a.date DESC, a.time DESC
         LIMIT $2`,
        [id, limit]
      );
      
      res.json(result.rows);
    } catch (err) {
      console.error('Erro ao buscar histórico do paciente:', err);
      res.status(500).json({ error: 'Erro interno ao buscar histórico' });
    }
  },

  /**
   * Obtém estatísticas sobre pacientes
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  getPatientStats: async (req, res) => {
    try {
      // Consultas paralelas para estatísticas
      const [totalResult, newPatientsResult, insuranceResult, cityResult] = await Promise.all([
        db.query('SELECT COUNT(*) FROM patients'),
        db.query(`SELECT COUNT(*) FROM patients 
                 WHERE first_experience >= CURRENT_DATE - INTERVAL '30 days'`),
        db.query(`SELECT insurance, COUNT(*) 
                 FROM patients 
                 WHERE insurance IS NOT NULL 
                 GROUP BY insurance 
                 ORDER BY COUNT(*) DESC 
                 LIMIT 5`),
        db.query(`SELECT city, COUNT(*) 
                 FROM patients 
                 WHERE city IS NOT NULL 
                 GROUP BY city 
                 ORDER BY COUNT(*) DESC 
                 LIMIT 5`)
      ]);
      
      const stats = {
        total: parseInt(totalResult.rows[0].count, 10),
        newLast30Days: parseInt(newPatientsResult.rows[0].count, 10),
        topInsurances: insuranceResult.rows,
        topCities: cityResult.rows
      };
      
      res.json(stats);
    } catch (err) {
      console.error('Erro ao buscar estatísticas de pacientes:', err);
      res.status(500).json({ error: 'Erro interno ao buscar estatísticas' });
    }
  }
};
