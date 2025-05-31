require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importa as rotas
const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Habilita o parse de JSON no corpo das requisições

// Rotas
app.use('/api/appointments', appointmentsRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/doctors', doctorsRouter);

// Rota de saúde para verificar se o servidor está rodando
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
});
