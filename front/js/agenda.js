/**
 * Módulo para gerenciamento da agenda de consultas
 * Integração com backend via API REST
 */

// Formata data para YYYY-MM-DD
function formatDateForInput(date) {
  return date.toISOString().split('T')[0];
}

// Atualiza a agenda
async function refreshSchedule() {
  try {
    const currentDateStr = formatDateForInput(currentDate);
    const response = await fetch(`/api/appointments?date=${currentDateStr}`);
    
    if (!response.ok) throw new Error('Erro ao carregar consultas');
    
    const dayAppointments = await response.json();
    renderSchedule(dayAppointments);
    updateServiceCounts(dayAppointments);
  } catch (error) {
    console.error('Erro ao atualizar agenda:', error);
    alert('Falha ao carregar agenda. Tente novamente.');
  }
}

// Renderiza a grade de horários
function renderSchedule(appointments) {
  const scheduleGrid = document.getElementById('scheduleGrid');
  scheduleGrid.innerHTML = '';
  
  // Lógica para renderizar os horários...
  appointments.forEach(app => {
    // Adiciona cada consulta na grade
  });
}

// Salva uma consulta
async function saveAppointment(appointmentData) {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao salvar consulta');
    }
    
    await refreshSchedule();
    return true;
  } catch (error) {
    console.error('Erro ao salvar consulta:', error);
    alert(`Falha: ${error.message}`);
    return false;
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  refreshSchedule();
  
  // Event listeners
  document.getElementById('prevDay').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    refreshSchedule();
  });
  
  // ... outros eventos
});
