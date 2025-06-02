"use client"

import { useState } from "react"
import type { Patient, Appointment, Doctor, DashboardMetrics } from "@/types"

// Mock data
const initialPatients: Patient[] = [
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
    medicalHistory: ["Hipertensão arterial", "Diabetes tipo 2"],
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
    emergencyContact: "(11) 97777-2222",
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
    address: "Rua da Esperança, 789",
  },
]

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Silva",
    phone: "(11) 99999-1111",
    service: "cardiologia",
    doctor: "dr_silva",
    time: "09:00",
    status: "confirmado",
    insurance: "unimed",
    observations: "Paciente com histórico de hipertensão",
    date: "2025-01-29",
    price: 250,
    duration: 30,
  },
  {
    id: 2,
    patientId: 2,
    patientName: "João Santos",
    phone: "(11) 99999-2222",
    service: "dermatologia",
    doctor: "dr_santos",
    time: "11:00",
    status: "pendente",
    insurance: "amil",
    observations: "Primeira consulta na clínica",
    date: "2025-01-29",
    price: 200,
  },
]

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Carlos Silva",
    specialty: "Cardiologia",
    crm: "SP-123456",
    phone: "(11) 98765-4321",
    email: "carlos.silva@medcenter.com",
    office: "Consultório 1",
    schedule: "Seg-Sex: 08:00 - 18:00",
    consultationPrice: 250,
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
    consultationPrice: 200,
  },
]

export function useMedicalData() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Calculate dashboard metrics
  const getDashboardMetrics = (): DashboardMetrics => {
    const today = new Date().toISOString().split("T")[0]
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const todayAppointments = appointments.filter((app) => app.date === today && app.status !== "cancelado").length

    const weekAppointments = appointments.filter((app) => {
      const appDate = new Date(app.date)
      return appDate >= weekStart && appDate <= weekEnd && app.status !== "cancelado"
    }).length

    const totalSlots = 20 * 5 // 20 slots per day, 5 days
    const occupiedSlots = weekAppointments
    const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100)

    const monthStart = new Date()
    monthStart.setDate(1)
    const newPatients = patients.filter((patient) => {
      const firstDate = new Date(patient.firstExperience)
      return firstDate >= monthStart
    }).length

    const revenue = appointments
      .filter((app) => app.status === "concluido" && app.price)
      .reduce((sum, app) => sum + (app.price || 0), 0)

    const pendingAppointments = appointments.filter((app) => app.status === "pendente").length

    return {
      todayAppointments,
      weekAppointments,
      occupancyRate,
      newPatients,
      revenue,
      pendingAppointments,
    }
  }

  // CRUD operations
  const addPatient = (patient: Omit<Patient, "id">) => {
    const newId = Math.max(0, ...patients.map((p) => p.id)) + 1
    setPatients([...patients, { ...patient, id: newId }])
  }

  const updatePatient = (id: number, patient: Partial<Patient>) => {
    setPatients(patients.map((p) => (p.id === id ? { ...p, ...patient } : p)))
  }

  const deletePatient = (id: number) => {
    setPatients(patients.filter((p) => p.id !== id))
    setAppointments(appointments.filter((a) => a.patientId !== id))
  }

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newId = Math.max(0, ...appointments.map((a) => a.id)) + 1
    setAppointments([...appointments, { ...appointment, id: newId }])
  }

  const updateAppointment = (id: number, appointment: Partial<Appointment>) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, ...appointment } : a)))
  }

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  const addDoctor = (doctor: Omit<Doctor, "id">) => {
    const newId = Math.max(0, ...doctors.map((d) => d.id)) + 1
    setDoctors([...doctors, { ...doctor, id: newId }])
  }

  const updateDoctor = (id: number, doctor: Partial<Doctor>) => {
    setDoctors(doctors.map((d) => (d.id === id ? { ...d, ...doctor } : d)))
  }

  const deleteDoctor = (id: number) => {
    setDoctors(doctors.filter((d) => d.id !== id))
  }

  return {
    patients,
    appointments,
    doctors,
    currentDate,
    setCurrentDate,
    getDashboardMetrics,
    addPatient,
    updatePatient,
    deletePatient,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addDoctor,
    updateDoctor,
    deleteDoctor,
  }
}
