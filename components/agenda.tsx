"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react"
import { useMedicalData } from "@/hooks/use-medical-data"
import { cn } from "@/lib/utils"

// Função formatDate incluída diretamente no componente
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("pt-BR", options)
}

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const doctors = [
  { id: "dr_silva", name: "Dr. Silva", specialty: "Cardiologia" },
  { id: "dr_santos", name: "Dra. Santos", specialty: "Dermatologia" },
]

export function Agenda() {
  const { appointments, currentDate, setCurrentDate } = useMedicalData()
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all")

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const currentDateStr = currentDate.toISOString().split("T")[0]
  const dayAppointments = appointments.filter(
    (app) => app.date === currentDateStr && (selectedDoctor === "all" || app.doctor === selectedDoctor),
  )

  const getAppointmentForSlot = (doctorId: string, time: string) => {
    return dayAppointments.find((app) => app.doctor === doctorId && app.time === time)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      case "concluido":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const specialtyCounts = {
    cardiologia: dayAppointments.filter((a) => a.service === "cardiologia" && a.status !== "cancelado").length,
    dermatologia: dayAppointments.filter((a) => a.service === "dermatologia" && a.status !== "cancelado").length,
    pediatria: dayAppointments.filter((a) => a.service === "pediatria" && a.status !== "cancelado").length,
    ortopedia: dayAppointments.filter((a) => a.service === "ortopedia" && a.status !== "cancelado").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Agenda</h1>
          <p className="text-slate-600">Gerencie suas consultas</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="text-center">
              <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
            </div>

            <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Specialty Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(specialtyCounts).map(([specialty, count]) => (
          <Card key={specialty}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">{count}</div>
              <div className="text-sm text-slate-600 capitalize">{specialty}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Doctor Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Agenda do Dia</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">Todos os Médicos</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="font-medium text-center py-2 bg-slate-100 rounded">Horário</div>
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="font-medium text-center py-2 bg-slate-100 rounded">
                    <div>{doctor.name}</div>
                    <div className="text-xs text-slate-600">{doctor.specialty}</div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-3 gap-4">
                    <div className="flex items-center justify-center py-3 text-sm font-medium text-slate-600 bg-slate-50 rounded">
                      {time}
                    </div>
                    {doctors.map((doctor) => {
                      const appointment = getAppointmentForSlot(doctor.id, time)
                      return (
                        <div
                          key={doctor.id}
                          className={cn(
                            "min-h-[60px] p-2 border-2 border-dashed border-slate-200 rounded cursor-pointer hover:border-orange-300 transition-colors",
                            appointment && "border-solid",
                          )}
                        >
                          {appointment ? (
                            <div className="h-full">
                              <div className="text-sm font-medium mb-1">{appointment.patientName}</div>
                              <div className="text-xs text-slate-600 mb-2">{appointment.service}</div>
                              <Badge variant="outline" className={cn("text-xs", getStatusColor(appointment.status))}>
                                {appointment.status}
                              </Badge>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
