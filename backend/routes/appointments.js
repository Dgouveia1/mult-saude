const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

/**
 * Rotas para gerenciamento de consultas:
 * 
 * GET / - Busca consultas por data
 * POST / - Cria/atualiza uma consulta
 * DELETE /:id - Exclui uma consulta
 */
router.get('/', appointmentController.getAppointmentsByDate);
router.post('/', appointmentController.saveAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
