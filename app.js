// Medical Center Management System - JavaScript

// Global variables
let currentDate = new Date();
let activeSection = 'dashboard';
let patients = [];
let doctors = [];
let appointments = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateCurrentDate();
    updateDashboard();
    setupEventListeners();
    showSection('dashboard');
});

// Initialize mock data
function initializeData() {
    // Initialize patients
    patients = [
        {
            id: 1,
            name: "Maria Silva",
            phone: "(11) 99999-1111",
            email: "maria.silva@email.com",
            city: "São Paulo",
            birthDate: "1990-05-15",
            firstExperience: "2024-01-15",
            insurance: "unimed",
            tags: ["hipertensão", "check-up anual"],
            cpf: "123.456.789-00",
            address: "Rua das Flores, 123",
            emergencyContact: "(11) 98888-1111",
            medicalHistory: ["Hipertensão arterial", "Diabetes tipo 2"]
        },
        {
            id: 2,
            name: "João Santos",
            phone: "(11) 99999-2222",
            email: "joao.santos@email.com",
            city: "São Paulo",
            birthDate: "1985-08-22",
            firstExperience: "2024-03-10",
            insurance: "amil",
            tags: ["dermatite", "alergia"],
            cpf: "987.654.321-00",
            address: "Av. Paulista, 456",
            emergencyContact: "(11) 97777-2222"
        },
        {
            id: 3,
            name: "Ana Costa",
            phone: "(11) 99999-3333",
            email: "ana.costa@email.com",
            city: "Guarulhos",
            birthDate: "1992-12-03",
            firstExperience: "2023-11-20",
            insurance: "particular",
            tags: ["pediatria", "vacinação"],
            cpf: "456.789.123-00",
            address: "Rua da Esperança, 789"
        }
    ];

    // Initialize doctors
    doctors = [
        {
            id: 1,
            name: "Dr. Carlos Silva",
            specialty: "Cardiologia",
            crm: "SP-123456",
            phone: "(11) 98765-4321",
            email: "carlos.silva@medcenter.com",
            office: "Consultório 1",
            schedule: "Seg-Sex: 08:00 - 18:00",
            consultationPrice: 250
        },
        {
            id: 2,
            name: "Dra. Ana Santos",
            specialty: "Dermatologia",
            crm: "SP-654321",
            phone: "(11) 98765-1234",
            email: "ana.santos@medcenter.com",
            office: "Consultório 2",
            schedule: "Seg-Qui: 09:00 - 17:00",
            consultationPrice: 200
        },
        {
            id: 3,
            name: "Dr. Pedro Lima",
            specialty: "Pediatria",
            crm: "SP-789123",
            phone: "(11) 98765-5678",
            email: "pedro.lima@medcenter.com",
            office: "Consultório 3",
            schedule: "Ter-Sab: 08:00 - 16:00",
            consultationPrice: 180
        }
    ];

    // Initialize appointments
    appointments = [
        {
            id: 1,
            patientId: 1,
            patientName: "Maria Silva",
            phone: "(11) 99999-1111",
            service: "Cardiologia",
            doctor: "Dr. Carlos Silva",
            doctorId: 1,
            time: "09:00",
            status: "confirmado",
            insurance: "unimed",
            observations: "Paciente com histórico de hipertensão",
            date: formatDate(new Date()),
            price: 250,
            duration: 30
        },
        {
            id: 2,
            patientId: 2,
            patientName: "João Santos",
            phone: "(11) 99999-2222",
            service: "Dermatologia",
            doctor: "Dra. Ana Santos",
            doctorId: 2,
            time: "11:00",
            status: "pendente",
            insurance: "amil",
            observations: "Primeira consulta na clínica",
            date: formatDate(new Date()),
            price: 200
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('patientSearch').addEventListener('input', filterPatients);
    document.getElementById('doctorSearch').addEventListener('input', filterDoctors);
    document.getElementById('insuranceFilter').addEventListener('change', filterPatients);
    document.getElementById('specialtyFilter').addEventListener('change', filterDoctors);
    document.getElementById('doctorFilter').addEventListener('change', renderCalendar);
    document.getElementById('selectedDate').addEventListener('change', function() {
        currentDate = new Date(this.value);
        renderCalendar();
    });

    // Set initial date
    document.getElementById('selectedDate').value = formatDate(currentDate);
}

// Navigation functions
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    // Show selected section
    document.getElementById(section).classList.add('active');
    document.querySelector(`[onclick="showSection('${section}')"]`).classList.add('active');
    
    activeSection = section;
    
    // Load section-specific content
    switch(section) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'agenda':
            renderCalendar();
            populateDoctorFilter();
            break;
        case 'patients':
            renderPatients();
            populateInsuranceFilter();
            break;
        case 'doctors':
            renderDoctors();
            populateSpecialtyFilter();
            break;
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
}

// Dashboard functions
function updateDashboard() {
    const metrics = calculateMetrics();
    
    document.getElementById('todayAppointments').textContent = metrics.todayAppointments;
    document.getElementById('weekAppointments').textContent = metrics.weekAppointments;
    document.getElementById('occupancyRate').textContent = metrics.occupancyRate + '%';
    document.getElementById('newPatients').textContent = metrics.newPatients;
    document.getElementById('totalPatients').textContent = patients.length;
    document.getElementById('totalDoctors').textContent = doctors.length;
    document.getElementById('totalRevenue').textContent = 'R$ ' + metrics.revenue.toLocaleString();
    
    renderRecentActivity();
}

function calculateMetrics() {
    const today = formatDate(new Date());
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const todayAppointments = appointments.filter(app => 
        app.date === today && app.status !== 'cancelado'
    ).length;

    const weekAppointments = appointments.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= weekStart && appDate <= weekEnd && app.status !== 'cancelado';
    }).length;

    const totalSlots = 20 * 5; // 20 slots per day, 5 days
    const occupiedSlots = weekAppointments;
    const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100);

    const monthStart = new Date();
    monthStart.setDate(1);
    const newPatients = patients.filter(patient => {
        const firstDate = new Date(patient.firstExperience);
        return firstDate >= monthStart;
    }).length;

    const revenue = appointments
        .filter(app => app.status === 'concluido' && app.price)
        .reduce((sum, app) => sum + (app.price || 0), 0);

    return {
        todayAppointments,
        weekAppointments,
        occupancyRate,
        newPatients,
        revenue
    };
}

function renderRecentActivity() {
    const activities = [
        { action: "Nova consulta agendada", patient: "Maria Silva", time: "2 min atrás", icon: "fas fa-calendar-plus", color: "bg-primary" },
        { action: "Consulta confirmada", patient: "João Santos", time: "5 min atrás", icon: "fas fa-check-circle", color: "bg-success" },
        { action: "Novo paciente cadastrado", patient: "Ana Costa", time: "10 min atrás", icon: "fas fa-user-plus", color: "bg-info" },
        { action: "Consulta concluída", patient: "Carlos Lima", time: "15 min atrás", icon: "fas fa-clipboard-check", color: "bg-warning" }
    ];

    const activityHtml = activities.map(item => `
        <div class="activity-item">
            <div class="activity-icon ${item.color} text-white">
                <i class="${item.icon}"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-medium">${item.action}</div>
                <small class="text-muted">${item.patient} • ${item.time}</small>
            </div>
        </div>
    `).join('');

    document.getElementById('recentActivity').innerHTML = activityHtml;
}

// Calendar functions
function renderCalendar() {
    const selectedDate = document.getElementById('selectedDate').value;
    const doctorFilter = document.getElementById('doctorFilter').value;
    
    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    const filteredDoctors = doctorFilter === 'all' ? doctors : doctors.filter(d => d.id == doctorFilter);
    
    let calendarHtml = '<div class="calendar-header">Horário</div>';
    
    // Doctor headers
    filteredDoctors.forEach(doctor => {
        calendarHtml += `
            <div class="calendar-header text-center">
                <div class="fw-bold">${doctor.name}</div>
                <small class="text-muted">${doctor.specialty}</small>
            </div>
        `;
    });

    // Time slots
    timeSlots.forEach(time => {
        calendarHtml += `<div class="calendar-header">${time}</div>`;
        
        filteredDoctors.forEach(doctor => {
            const appointment = appointments.find(app => 
                app.date === selectedDate && 
                app.doctorId === doctor.id && 
                app.time === time
            );

            if (appointment) {
                const statusClass = appointment.status === 'confirmado' ? 'confirmed' : 'pending';
                calendarHtml += `
                    <div class="calendar-cell">
                        <div class="appointment-slot ${statusClass}" onclick="editAppointment(${appointment.id})">
                            <div class="fw-bold">${appointment.patientName}</div>
                            <small>${appointment.service}</small>
                        </div>
                    </div>
                `;
            } else {
                calendarHtml += `
                    <div class="calendar-cell">
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="quickAddAppointment('${doctor.id}', '${time}', '${selectedDate}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                `;
            }
        });
    });

    document.getElementById('calendarGrid').innerHTML = calendarHtml;
}

function populateDoctorFilter() {
    const select = document.getElementById('doctorFilter');
    select.innerHTML = '<option value="all">Todos os Médicos</option>';
    
    doctors.forEach(doctor => {
        select.innerHTML += `<option value="${doctor.id}">${doctor.name}</option>`;
    });
}

function previousDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    document.getElementById('selectedDate').value = formatDate(currentDate);
    renderCalendar();
}

function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    document.getElementById('selectedDate').value = formatDate(currentDate);
    renderCalendar();
}

// Patient functions
function renderPatients() {
    const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
    const insuranceFilter = document.getElementById('insuranceFilter').value;
    
    let filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm) || 
                            patient.phone.includes(searchTerm) ||
                            patient.cpf.includes(searchTerm);
        const matchesInsurance = insuranceFilter === 'all' || patient.insurance === insuranceFilter;
        return matchesSearch && matchesInsurance;
    });

    const patientsHtml = filteredPatients.map(patient => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="patient-card">
                <div class="d-flex align-items-start mb-3">
                    <div class="avatar me-3">
                        ${patient.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="mb-1">${patient.name}</h5>
                        <span class="badge badge-custom bg-primary">${getInsuranceLabel(patient.insurance)}</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="editPatient(${patient.id})">
                                <i class="fas fa-edit me-2"></i>Editar
                            </a></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="deletePatient(${patient.id})">
                                <i class="fas fa-trash me-2"></i>Excluir
                            </a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="mb-2">
                    <small class="text-muted">
                        <i class="fas fa-phone me-1"></i>${patient.phone}
                    </small>
                </div>
                
                ${patient.email ? `
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-envelope me-1"></i>${patient.email}
                        </small>
                    </div>
                ` : ''}
                
                <div class="mb-2">
                    <small class="text-muted">
                        <i class="fas fa-map-marker-alt me-1"></i>${patient.city}
                    </small>
                </div>
                
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="fas fa-birthday-cake me-1"></i>${calculateAge(patient.birthDate)} anos
                    </small>
                </div>
                
                <div class="text-muted">
                    <small>Paciente há ${calculateExperience(patient.firstExperience)}</small>
                </div>
                
                ${patient.tags && patient.tags.length > 0 ? `
                    <div class="mt-2">
                        ${patient.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    document.getElementById('patientsList').innerHTML = patientsHtml;
}

function filterPatients() {
    renderPatients();
}

function populateInsuranceFilter() {
    const insurances = [...new Set(patients.map(p => p.insurance))];
    const select = document.getElementById('insuranceFilter');
    
    select.innerHTML = '<option value="all">Todos os Convênios</option>';
    insurances.forEach(insurance => {
        select.innerHTML += `<option value="${insurance}">${getInsuranceLabel(insurance)}</option>`;
    });
}

// Doctor functions
function renderDoctors() {
    const searchTerm = document.getElementById('doctorSearch').value.toLowerCase();
    const specialtyFilter = document.getElementById('specialtyFilter').value;
    
    let filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm) || 
                            doctor.specialty.toLowerCase().includes(searchTerm) ||
                            doctor.crm.includes(searchTerm);
        const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
        return matchesSearch && matchesSpecialty;
    });

    const doctorsHtml = filteredDoctors.map(doctor => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="doctor-card">
                <div class="d-flex align-items-start mb-3">
                    <div class="avatar me-3">
                        ${doctor.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="mb-1">${doctor.name}</h5>
                        <span class="badge badge-custom ${getSpecialtyColor(doctor.specialty)}">${doctor.specialty}</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="editDoctor(${doctor.id})">
                                <i class="fas fa-edit me-2"></i>Editar
                            </a></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="deleteDoctor(${doctor.id})">
                                <i class="fas fa-trash me-2"></i>Excluir
                            </a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="mb-2">
                    <small class="text-muted">
                        <strong>CRM:</strong> ${doctor.crm}
                    </small>
                </div>
                
                ${doctor.phone ? `
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-phone me-1"></i>${doctor.phone}
                        </small>
                    </div>
                ` : ''}
                
                ${doctor.email ? `
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-envelope me-1"></i>${doctor.email}
                        </small>
                    </div>
                ` : ''}
                
                <div class="mb-2">
                    <small class="text-muted">
                        <i class="fas fa-map-marker-alt me-1"></i>${doctor.office}
                    </small>
                </div>
                
                <div class="mb-3">
                    <small class="text-muted">
                        <strong>Horário:</strong><br>${doctor.schedule}
                    </small>
                </div>
                
                ${doctor.consultationPrice ? `
                    <div class="bg-light rounded p-2 text-center">
                        <div class="h5 text-success mb-0">R$ ${doctor.consultationPrice.toLocaleString()}</div>
                        <small class="text-muted">Valor da Consulta</small>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    document.getElementById('doctorsList').innerHTML = doctorsHtml;
}

function filterDoctors() {
    renderDoctors();
}

function populateSpecialtyFilter() {
    const specialties = [...new Set(doctors.map(d => d.specialty))];
    const select = document.getElementById('specialtyFilter');
    
    select.innerHTML = '<option value="all">Todas as Especialidades</option>';
    specialties.forEach(specialty => {
        select.innerHTML += `<option value="${specialty}">${specialty}</option>`;
    });
}

// Modal functions
function showAddPatientModal() {
    document.getElementById('patientForm').reset();
    new bootstrap.Modal(document.getElementById('addPatientModal')).show();
}

function showAddDoctorModal() {
    document.getElementById('doctorForm').reset();
    new bootstrap.Modal(document.getElementById('addDoctorModal')).show();
}

function showAddAppointmentModal() {
    document.getElementById('appointmentForm').reset();
    populateAppointmentSelects();
    new bootstrap.Modal(document.getElementById('addAppointmentModal')).show();
}

function populateAppointmentSelects() {
    // Populate patients
    const patientSelect = document.getElementById('appointmentPatient');
    patientSelect.innerHTML = '<option value="">Selecione o paciente...</option>';
    patients.forEach(patient => {
        patientSelect.innerHTML += `<option value="${patient.id}">${patient.name}</option>`;
    });

    // Populate doctors
    const doctorSelect = document.getElementById('appointmentDoctor');
    doctorSelect.innerHTML = '<option value="">Selecione o médico...</option>';
    doctors.forEach(doctor => {
        doctorSelect.innerHTML += `<option value="${doctor.id}">${doctor.name} - ${doctor.specialty}</option>`;
    });
}

// CRUD operations
function savePatient() {
    const form = document.getElementById('patientForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const newPatient = {
        id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
        name: document.getElementById('patientName').value,
        cpf: document.getElementById('patientCpf').value,
        phone: document.getElementById('patientPhone').value,
        email: document.getElementById('patientEmail').value,
        birthDate: document.getElementById('patientBirthDate').value,
        insurance: document.getElementById('patientInsurance').value,
        address: document.getElementById('patientAddress').value,
        city: document.getElementById('patientCity').value,
        emergencyContact: document.getElementById('patientEmergencyContact').value,
        firstExperience: formatDate(new Date()),
        tags: []
    };

    patients.push(newPatient);
    bootstrap.Modal.getInstance(document.getElementById('addPatientModal')).hide();
    renderPatients();
    updateDashboard();
    
    showToast('Paciente adicionado com sucesso!', 'success');
}

function saveDoctor() {
    const form = document.getElementById('doctorForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const newDoctor = {
        id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
        name: document.getElementById('doctorName').value,
        crm: document.getElementById('doctorCrm').value,
        specialty: document.getElementById('doctorSpecialty').value,
        phone: document.getElementById('doctorPhone').value,
        email: document.getElementById('doctorEmail').value,
        office: document.getElementById('doctorOffice').value,
        schedule: document.getElementById('doctorSchedule').value,
        consultationPrice: parseFloat(document.getElementById('doctorPrice').value) || 0
    };

    doctors.push(newDoctor);
    bootstrap.Modal.getInstance(document.getElementById('addDoctorModal')).hide();
    renderDoctors();
    updateDashboard();
    
    showToast('Médico adicionado com sucesso!', 'success');
}

function saveAppointment() {
    const form = document.getElementById('appointmentForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const patientId = parseInt(document.getElementById('appointmentPatient').value);
    const doctorId = parseInt(document.getElementById('appointmentDoctor').value);
    const patient = patients.find(p => p.id === patientId);
    const doctor = doctors.find(d => d.id === doctorId);

    const newAppointment = {
        id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
        patientId: patientId,
        patientName: patient.name,
        phone: patient.phone,
        service: doctor.specialty,
        doctor: doctor.name,
        doctorId: doctorId,
        time: document.getElementById('appointmentTime').value,
        status: document.getElementById('appointmentStatus').value,
        insurance: patient.insurance,
        observations: document.getElementById('appointmentObservations').value,
        date: document.getElementById('appointmentDate').value,
        price: doctor.consultationPrice,
        duration: 30
    };

    appointments.push(newAppointment);
    bootstrap.Modal.getInstance(document.getElementById('addAppointmentModal')).hide();
    renderCalendar();
    updateDashboard();
    
    showToast('Consulta agendada com sucesso!', 'success');
}

function deletePatient(id) {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        patients = patients.filter(p => p.id !== id);
        appointments = appointments.filter(a => a.patientId !== id);
        renderPatients();
        updateDashboard();
        showToast('Paciente excluído com sucesso!', 'success');
    }
}

function deleteDoctor(id) {
    if (confirm('Tem certeza que deseja excluir este médico?')) {
        doctors = doctors.filter(d => d.id !== id);
        appointments = appointments.filter(a => a.doctorId !== id);
        renderDoctors();
        updateDashboard();
        showToast('Médico excluído com sucesso!', 'success');
    }
}

function quickAddAppointment(doctorId, time, date) {
    document.getElementById('appointmentDoctor').value = doctorId;
    document.getElementById('appointmentTime').value = time;
    document.getElementById('appointmentDate').value = date;
    populateAppointmentSelects();
    showAddAppointmentModal();
}

// Utility functions
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function updateCurrentDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = 
        new Date().toLocaleDateString('pt-BR', options);
}

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

function calculateExperience(firstDate) {
    const today = new Date();
    const first = new Date(firstDate);
    const diffTime = Math.abs(today - first);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
        return `${diffDays} dias`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
}

function getInsuranceLabel(insurance) {
    const labels = {
        'unimed': 'Unimed',
        'amil': 'Amil',
        'particular': 'Particular'
    };
    return labels[insurance] || insurance;
}

function getSpecialtyColor(specialty) {
    const colors = {
        'Cardiologia': 'bg-danger',
        'Dermatologia': 'bg-warning',
        'Pediatria': 'bg-info',
        'Ortopedia': 'bg-success',
        'Ginecologia': 'bg-primary',
        'Neurologia': 'bg-secondary'
    };
    return colors[specialty] || 'bg-secondary';
}

function showToast(message, type = 'info') {
    // Create toast element
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Add to toast container (create if doesn't exist)
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Show toast
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}
