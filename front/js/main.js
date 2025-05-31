/**
 * Módulo principal com funções compartilhadas
 */

// Formatar data para YYYY-MM-DD
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Formatar data para exibição (DD/MM/YYYY)
function formatDateForDisplay(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Calcular idade a partir da data de nascimento
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Configuração inicial do sistema
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sistema MedCenter iniciado');
  
  // Event listeners comuns
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', switchPage);
  });
  
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleSidebar);
});

/**
 * Alternar entre páginas do sistema
 */
function switchPage(event) {
  const pageId = event.currentTarget.getAttribute('data-page');
  
  // Atualizar menu ativo
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  // Mostrar página correspondente
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

/**
 * Alternar sidebar em dispositivos móveis
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('sidebar-active');
}
