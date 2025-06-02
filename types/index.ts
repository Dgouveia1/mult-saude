export interface Patient {
  id: number
  name: string
  phone: string
  email?: string
  city: string
  birthDate: string
  firstExperience: string
  insurance: string
  tags: string[]
  cpf?: string
  address?: string
  emergencyContact?: string
  medicalHistory?: string[]
}

export interface Appointment {
  id: number
  patientId: number
  patientName: string
  phone?: string
  service: string
  doctor: string
  time: string
  status: "confirmado" | "pendente" | "cancelado" | "concluido"
  insurance: string
  observations?: string
  date: string
  price?: number
  duration?: number
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  crm: string
  phone?: string
  email?: string
  office: string
  schedule: string
  avatar?: string
  consultationPrice?: number
}

export interface DashboardMetrics {
  todayAppointments: number
  weekAppointments: number
  occupancyRate: number
  newPatients: number
  revenue: number
  pendingAppointments: number
}
