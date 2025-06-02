"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, UserCheck, Phone, Mail, Calendar, MapPin, Stethoscope } from "lucide-react"
import { useMedicalData } from "@/hooks/use-medical-data"

export function Doctors() {
  const { doctors } = useMedicalData()

  const specialtyColors = {
    Cardiologia: "bg-red-100 text-red-800",
    Dermatologia: "bg-blue-100 text-blue-800",
    Pediatria: "bg-green-100 text-green-800",
    Ortopedia: "bg-purple-100 text-purple-800",
    "Clínico Geral": "bg-gray-100 text-gray-800",
    Ginecologia: "bg-pink-100 text-pink-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Médicos</h1>
          <p className="text-slate-600">Gerencie os profissionais</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo Médico
        </Button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{doctor.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={
                      specialtyColors[doctor.specialty as keyof typeof specialtyColors] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {doctor.specialty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">CRM:</span>
                  <span>{doctor.crm}</span>
                </div>

                {doctor.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{doctor.phone}</span>
                  </div>
                )}

                {doctor.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{doctor.office}</span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Horário:</span>
                    <p className="text-slate-600">{doctor.schedule}</p>
                  </div>
                </div>

                {doctor.consultationPrice && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-sm text-slate-600">Valor da Consulta</div>
                    <div className="text-lg font-semibold text-green-600">
                      R$ {doctor.consultationPrice.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Ver Agenda
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{doctors.length}</div>
                <div className="text-sm text-slate-600">Médicos Ativos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{new Set(doctors.map((d) => d.specialty)).size}</div>
                <div className="text-sm text-slate-600">Especialidades</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{new Set(doctors.map((d) => d.office)).size}</div>
                <div className="text-sm text-slate-600">Consultórios</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
